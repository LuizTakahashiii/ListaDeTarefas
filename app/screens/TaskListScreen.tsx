import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskItem from '../../components/TaskItem';

interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

const TaskListScreen = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addTask = () => {
        if (title.trim()) {
            setTasks([...tasks, {
                id: Date.now().toString(),
                title,
                description,
                completed: false,
            }]);
            setTitle('');
            setDescription('');
        }
    };

    const toggleCompleteTask = (taskId: string) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Lista de Tarefas</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#999999"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição (Opcional)"
                placeholderTextColor="#999999"
                value={description}
                onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        title={item.title}
                        description={item.description}
                        completed={item.completed}
                        onToggleComplete={() => toggleCompleteTask(item.id)}
                        onDelete={() => deleteTask(item.id)}
                    />
                )}
                style={styles.taskList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#1A1A1A',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFA500',
    },
    input: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#555555',
        borderWidth: 1,
        color: '#FFFFFF',
    },
    addButton: {
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#1A1A1A',
        fontWeight: 'bold',
        fontSize: 16,
    },
    taskList: {
        marginTop: 20,
    },
});

export default TaskListScreen;
