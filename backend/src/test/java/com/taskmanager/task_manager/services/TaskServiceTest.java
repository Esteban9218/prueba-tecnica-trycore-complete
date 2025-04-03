package com.taskmanager.task_manager.services;

import com.taskmanager.task_manager.models.Task;
import com.taskmanager.task_manager.observers.Observer;
import com.taskmanager.task_manager.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private Observer observer;  // Simulación del observador (líder técnico)

    @InjectMocks
    private TaskService taskService;

    private Task testTask;

    @BeforeEach
    void setUp() {
        testTask = new Task(1L, "Nueva tarea", "Descripción", "ALTA", "pendiente");
    }

    @Test
    void testCreateTaskWithFactory() {
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        Task createdTask = taskService.createTask("ALTA", 1L, "Nueva tarea", "Descripción", "pendiente");

        assertNotNull(createdTask);
        assertEquals("ALTA", createdTask.getPriority());
        assertEquals("Nueva tarea", createdTask.getTitle());

        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testUpdateTaskStatusTriggersNotification() {
        testTask.setStatus("Completada");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(testTask));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        taskService.addObserver(observer);
        taskService.updateTask(1L, testTask);

        ArgumentCaptor<String> messageCaptor = ArgumentCaptor.forClass(String.class);

        //verify(observer, times(1)).update("La tarea con ID="+ testTask.getId() +" '" + testTask.getTitle() + "' ha sido completada.");
        verify(observer, times(1)).update(messageCaptor.capture());
        String actualMessage = messageCaptor.getValue();
        assertTrue(actualMessage.contains("'Nueva tarea' ha sido completada."));
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1L);

        taskService.deleteTask(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }
}