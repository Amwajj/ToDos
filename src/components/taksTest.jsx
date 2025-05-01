import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TaskBoard() {
    const [todoTasks, setTodoTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

useEffect(() => {
    fetchTasks();
}, []);

const fetchTasks = () => {
    axios.get('http://localhost:8080/tasks')
        .then(res => {
            const tasks = res.data.content;
            // Assuming tasks have a status: 'todo' or 'done'
            setTodoTasks(tasks);
        })
        .catch(err => console.error('Error fetching tasks:', err));
};

const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
        // Moving within the same column
        const items = reorder(
            getList(source.droppableId),
            source.index,
            destination.index
        );
        if (source.droppableId === 'todo') {
            setTodoTasks(items);
        } else {
            setDoneTasks(items);
        }
    } else {
        // Moving to another column
        const result = move(
            getList(source.droppableId),
            getList(destination.droppableId),
            source,
            destination
        );

        setTodoTasks(result.todo);
        setDoneTasks(result.done);

        // Optionally update backend here: send a PATCH request to change status
        const movedItem = result[destination.droppableId][destination.index];
        axios.patch(`http://localhost:8080/tasks/${movedItem.id}`, {
            status: destination.droppableId === 'todo' ? 'todo' : 'done'
        });
    }
};

const getList = (id) => (id === 'todo' ? todoTasks : doneTasks);

return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            {['todo', 'done'].map((columnId) => (
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                background: snapshot.isDraggingOver ? '#e0e0e0' : '#f4f4f4',
                                padding: 8,
                                width: 300,
                                minHeight: 500,
                                borderRadius: '5px'
                            }}
                        >
                            <h3 style={{ textAlign: 'center' }}>
                                {columnId === 'todo' ? 'To Do' : 'Done'}
                            </h3>
                            {getList(columnId).map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                userSelect: 'none',
                                                padding: 16,
                                                margin: '0 0 8px 0',
                                                minHeight: '50px',
                                                backgroundColor: snapshot.isDragging ? '#8ab4f8' : '#ffffff',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                ...provided.draggableProps.style
                                            }}
                                        >
                                            <div><strong>{task.name}</strong></div>
                                            <div>ID: {task.id}</div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </div>
    </DragDropContext>
);
}

// Helpers
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

destClone.splice(droppableDestination.index, 0, removed);

const result = {};
result[droppableSource.droppableId] = sourceClone;
result[droppableDestination.droppableId] = destClone;

return result;
};

export default TaskBoard;

