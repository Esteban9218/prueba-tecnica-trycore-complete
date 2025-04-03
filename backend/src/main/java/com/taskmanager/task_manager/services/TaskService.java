package com.taskmanager.task_manager.services;

import com.taskmanager.task_manager.factories.*;
import com.taskmanager.task_manager.models.Task;
import com.taskmanager.task_manager.models.User;
import com.taskmanager.task_manager.observers.Observer;
import com.taskmanager.task_manager.observers.Observable;
import com.taskmanager.task_manager.observers.TaskObserver;
import com.taskmanager.task_manager.repositories.TaskRepository;
import com.taskmanager.task_manager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class TaskService implements Observable {

    // @Autowired
    // private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    private List<Observer> observers = new ArrayList<>();

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(String priority, Long userId, String title, String description, String status) {
        TaskFactory factory;
    
        switch (priority.toUpperCase()) {
            case "ALTA":
                factory = new HighPriorityTaskFactory();
                break;
            case "MEDIA":
                factory = new MediumPriorityTaskFactory();
                break;
            case "BAJA":
                factory = new LowPriorityTaskFactory();
                break;
            default:
                //System.out.println("ERROR: priority - " + priority);
                throw new IllegalArgumentException("Prioridad no válida");
        }
        
        Task task = factory.createTask(userId, title, description, status);
        return taskRepository.save(task);
    }
    

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public List<Task> getTasksByStatus(String userId) {
        return taskRepository.findByStatus(userId);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);

        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setPriority(taskDetails.getPriority());
            task.setStatus(taskDetails.getStatus());

            Task updatedTask = taskRepository.save(task);

            if ("completada".equalsIgnoreCase(updatedTask.getStatus())) {
                notifyObservers("La tarea con ID="+ id +" '" + updatedTask.getTitle() + "' ha sido completada.");
            }

            return updatedTask;
        } else {
            throw new RuntimeException("Tarea no encontrada");
        }
    }

    public void loadObservers() {
        List<User> leaders = userRepository.findByRole("lider");

        for (User leader : leaders) {
            addObserver(new TaskObserver(leader));
        }
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}