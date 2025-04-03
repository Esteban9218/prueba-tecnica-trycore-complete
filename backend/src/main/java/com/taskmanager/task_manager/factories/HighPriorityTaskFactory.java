package com.taskmanager.task_manager.factories;

import com.taskmanager.task_manager.models.Task;

public class HighPriorityTaskFactory implements TaskFactory {
    @Override
    public Task createTask(Long userId, String title, String description, String status) {
        return new Task(userId, title, description, "Alta", status);
    }
}