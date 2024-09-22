import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = Array.from({ length: 10 }, (_, i) => ({
  id: `task-${i + 1}`,
  content: `Test Task ${i + 1}`,
}));

const initialColumns = {
  unplanned: {
    name: 'Unplanned',
    tasks: initialTasks,
  },
  today: {
    name: 'Today',
    tasks: [],
  },
  tomorrow: {
    name: 'Tomorrow',
    tasks: [],
  },
  thisWeek: {
    name: 'This Week',
    tasks: [],
  },
  nextWeek: {
    name: 'Next Week',
    tasks: [],
  },
};

function TaskList() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        tasks: destinationTasks,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {Object.entries(columns).map(([id, column]) => (
          <Droppable droppableId={id} key={id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  margin: '0 10px',
                  padding: '20px',
                  border: '1px solid lightgrey',
                  width: '200px',
                  minHeight: '400px',
                }}
              >
                <h2>{column.name}</h2>
                {column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '10px',
                          margin: '0 0 10px 0',
                          backgroundColor: '#fff',
                          border: '1px solid #ddd',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.content}
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

export default TaskList;
