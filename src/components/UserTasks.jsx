import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, Space, Select, 
} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GoDotFill } from "react-icons/go";
import {getTagColorClass} from './tagColor';

const { Meta } = Card;
const { Option } = Select;

function UserTasks() {
  const [tasksA, setTasksA] = useState([]);
  const [tasksB, setTasksB] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [tags, setTags] = useState([]); 


  // Load tasks
  useEffect(() => {
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        console.log('Loaded tasks:', response.data.content);
        setTasksA(response.data.content);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  // Load tags for filter dropdown
  useEffect(() => {
    axios.get('http://localhost:8080/tasks/tag')
      .then(response => {
        setTags(response.data);  // assuming backend returns a list of tag strings
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  // Filter tasks by tag
  const handleTagFilter = (tag) => {
    if (!tag) {
      // Clear filter, reload all tasks
      axios.get('http://localhost:8080/tasks/tag')
        .then(res => {
          setTasksA(res.data.content);
        })
        .catch(err => console.error(err));
    } else {
      axios.get(`http://localhost:8080/tasks/filter?tag=${tag}`)
        .then(res => {
          setTasksA(res.data);  // assuming backend returns List<TaskDto>
        })
        .catch(err => console.error(err));
    }
  };




  const showModal = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

 


  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    let sourceTasks = source.droppableId === 'cardA' ? tasksA : tasksB;
    let destTasks = destination.droppableId === 'cardA' ? tasksA : tasksB;
    const [movedItem] = sourceTasks.splice(source.index, 1);

    destTasks.splice(destination.index, 0, movedItem);

    if (source.droppableId === 'cardA') setTasksA([...sourceTasks]);
    else setTasksB([...sourceTasks]);

    if (destination.droppableId === 'cardA') setTasksA([...destTasks]);
    else setTasksB([...destTasks]);
  };

  const handleSearch = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        let response = await axios.get(`http://localhost:8080/tasks/search?keyword=${value}`);
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
        console.log(response.data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }



  return (
    <div className=" items-center">
      <div>
        <h1 className="ml-20 text-4xl font-semibold">To Do List</h1>
      </div>

      <div className="columns-2 ">

        {/* Filter by Tag */}
        <div >
          {console.log('tags', tags)}
          <Select
            style={{ width: 100, marginLeft: 100 }}
            className="placeholder-slate-900"
            placeholder="Filter"
            onChange={handleTagFilter}
            allowClear
          >
            {tags.map(tag => (
              <Option key={tag} value={tag}>{tag}</Option>
            ))}
          </Select>
        </div>

        {/*search bar */}
        <div>
          <form className="" onSubmit={(e)=>{
            e.preventDefault();
            handleSearch(input);
          }}>
            <div className="flex">

              <div className="relative w-full">
                <input type="search" id="search-dropdown" value={input}
                  onChange={(e) => handleSearch(e.target.value)} className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-100 rounded-lg  border border-gray-300  dark:bg-white  dark:placeholder-gray-400 dark:text-gray-900 dark:focus:border-violet-300" placeholder="Search " required />

                {showSearchResults && (
                  <ul className="list-group">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li key={result.id} className="list-group-item">
                          <button  onClick={() => showModal(result)} className="search-result-link">
                            <span>{result.title}</span>
                          </button>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <p className="">
                          No results found
                        </p>
                      )
                    )}
                  </ul>
                )}
                <button type="button" onClick={()=> handleSearch(input)} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-10 text-violet-800 bg-violet-100 rounded-e-lg border  hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-violet-200 dark:hover:bg-violet-300 dark:focus:ring-blue-800">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>




      </div>
      {/* Drag and Drop Cards */}
      <div className="flex container mx-auto px-4 mt-5 ml-20  space-x-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Space direction="horizontal" size={16}>
            {/* Card A */}
            <Droppable droppableId="cardA">

              {(provided, snapshot) => (
              <Card
                  className="relative"
                  title={<div className="flex items-center gap-2"><GoDotFill className="text-violet-900" /><span>To Do</span></div>}
                  style={{
                    background: snapshot.isDraggingOver ? '#e3f2fd' : 'white',
                    width: 400,
                    minHeight: 400
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ maxHeight: '400px', overflowY: 'auto', width: '100%' }}
                  >
                    {tasksB.map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                           <Card
                              className="ml-5"
                              style={{ width: 300 }}
                              cover={
                                task.fileName && (
                                  <img
                                    src={`http://localhost:8080/tasks/files/${task.fileName}`}
                                    alt="Task attachment"
                                  />

                                )
                              }
   
                            >
                              <Meta
                                title={task.title}
                                description={task.content}

                              />
                              <p className="text-sm">
                                <br />
                                {task.tag ? (
                                  <span className={`inline-block px-2 py-1 rounded text-white text-xs ${getTagColorClass(task.tag)}`}>
                                    {task.tag}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </p>

                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Space>
                </Card>
              )}
            </Droppable>
            
            {/* Card B */}
            <Droppable droppableId="cardB">
              {(provided, snapshot) => (
                <Card
                  className="relative"
                  title={<div className="flex items-center gap-2"><GoDotFill className="text-green-900" /><span>To Do</span></div>}
                  style={{
                    background: snapshot.isDraggingOver ? '#e3f2fd' : 'white',
                    width: 400,
                    minHeight: 400
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Space
                    direction="vertical"
                    size={16}
                    style={{ maxHeight: '400px', overflowY: 'auto', width: '100%' }}
                  >
                    {tasksB.map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                           <Card
                              className="ml-5"
                              style={{ width: 300 }}
                              cover={
                                task.fileName && (
                                  <img
                                    src={`http://localhost:8080/tasks/files/${task.fileName}`}
                                    alt="Task attachment"
                                  />

                                )
                              }
   
                            >
                              <Meta
                                title={task.title}
                                description={task.content}

                              />
                              <p className="text-sm">
                                <br />
                                {task.tag ? (
                                  <span className={`inline-block px-2 py-1 rounded text-white text-xs ${getTagColorClass(task.tag)}`}>
                                    {task.tag}
                                  </span>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </p>

                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Space>
                </Card>
              )}
            </Droppable>
          </Space>
        </DragDropContext>
      </div>

  
    </div>
  );
}

export default UserTasks;