package com.taskmanager.task_manager.factories;

import com.taskmanager.task_manager.models.Task;

public interface TaskFactory {
    Task createTask(Long userId, String title, String description, String status);
}