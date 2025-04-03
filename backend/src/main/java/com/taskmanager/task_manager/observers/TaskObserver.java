package com.taskmanager.task_manager.observers;

import com.taskmanager.task_manager.models.User;


public class TaskObserver implements Observer {
    private User user;

    public TaskObserver(User user) {
        this.user = user;
    }

    @Override
    public void update(String message) {
        System.out.println("\nNOTIFICACIÓN - Notificación para " + user.getName() + " (" + user.getEmail() + "): " + message);
    }
}