import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, Upload, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getTagColorClass } from './tagColor';
import { getAuthHeader } from '../auth';
import axios from 'axios';

const { Option } = Select;

export const Add = ({ isModalOpen, setIsModalOpen, selectTask,reloadTasks }) => {
  const [tags, setTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Load tags
  useEffect(() => {
    axios.get('http://localhost:8080/tasks/tag', { headers: getAuthHeader() })
      .then(response => {
        setTags(response.data);
        setLoadingTags(false);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
        setLoadingTags(false);
      });
  }, []);

  // Pre-fill form on edit
  useEffect(() => {
    if (selectTask) {
      form.setFieldsValue({
        title: selectTask.title,
        content: selectTask.content,
        tag: selectTask.tag,
      });
    }
  }, [selectTask, form]);

  // Submit new task
  const onFinish = async (values) => {
    try {
      const taskResponse = await axios.post("http://localhost:8080/tasks", {
        title: values.title,
        content: values.content,
        tag: values.tag,
        
      }, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json'
        }
        
      });

      const taskId = taskResponse.data.id;

      // Upload file if provided
      if (values.fileName) {
        const formData = new FormData();
        formData.append('file', values.fileName);

        await axios.post(`http://localhost:8080/tasks/${taskId}/upload`, formData, {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      reloadTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(onFinish)
      .then(() => {
        form.resetFields();
        setIsModalOpen(false);
        navigate('/tasks');
      })
      .catch(console.error);
  };

  const handleTagChange = (value) => {
    console.log('Selected tags:', value);
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const getColor = (val) => {
      const colors = ['magenta', 'volcano', 'gold', 'cyan', 'green', 'blue', 'purple'];
      return colors[val.length % colors.length];
    };
    return (
      <Tag className={`${getTagColorClass(value)} text-white px-2 py-1 rounded-sm text-xs`} color={getColor(value)} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  };

  return (
    <Modal
      title="Add Task"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {selectTask ? 'Save Changes' : 'Add Task'}
        </Button>
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item name="content" label="Content">
          <Input.TextArea rows={5} placeholder="Enter task details" />
        </Form.Item>

        <Form.Item name="tag" label="Tags">
          <Select mode="tags" placeholder="Select or type tags" onChange={handleTagChange} tagRender={tagRender}>
            {tags.map(tag => (
              <Option key={tag} value={tag}>{tag}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="fileName"
          label="Attachment"
          valuePropName="file"
          getValueFromEvent={e => e?.fileList?.[0]?.originFileObj || null}
        >
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};