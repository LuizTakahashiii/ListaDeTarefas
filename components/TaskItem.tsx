import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TaskItemProps {
    title: string;
    description?: string;
    completed: boolean;
    onToggleComplete: () => void;
    onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, completed, onToggleComplete, onDelete }) => {
    return (
        <View style={styles.taskItem}>
            <View style={styles.taskDetails}>
                <Text style={[styles.taskTitle, completed && styles.completed]}>{title}</Text>
                {description ? <Text style={styles.taskDescription}>{description}</Text> : null}
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={onToggleComplete}>
                    <FontAwesome name={completed ? "check-square-o" : "square-o"} size={24} color="#FFA500" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <FontAwesome name="trash-o" size={24} color="#FF4500" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        backgroundColor: '#333333',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    taskDetails: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    taskDescription: {
        fontSize: 14,
        color: '#BBBBBB',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#999999',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
    },
});

export default TaskItem;
