import React from 'react';
import { Form, Input, Select, Space, Button, FormInstance } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

interface Ingredient {
  last: string;
}

interface Recipe {
  Complexity: number;
  image: string;
  ingredients: Ingredient[];
  instructions: string;
  short: string;
  title: string;
}

interface CreateRecipeProps {
  form: FormInstance;
  onSubmit: (values: Recipe) => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ form, onSubmit }) => (
  
  <Form
    form={form}
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    style={{ maxWidth: 600 }}
    initialValues={{
      ingredients: [{}],
    }}
    onFinish={onSubmit}
  >
    <Form.Item label="Recipe Title" name="title" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item
      label="Complexity"
      name="Complexity"
      rules={[{ required: true, message: 'Please select a complexity level!' }]}
    >
      <Select placeholder="Select complexity">
        {[1, 2, 3, 4, 5].map((value) => (
          <Option key={value} value={value.toString()}>
            {value}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item label="Image Url" name="image" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item
      name="short"
      label="Short Descrtiption"
      rules={[{ required: true, message: 'Please input Short Description' }]}
    >
      <TextArea showCount maxLength={600} />
    </Form.Item>

    <Form.Item
      name="instructions"
      label="Instructions"
      rules={[{ required: true, message: 'Please Input Instructions' }]}
    >
      <TextArea showCount maxLength={600} />
    </Form.Item>

    <Form.List name="ingredients">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space 
              key={key} 
              style={{ display: 'flex', width: '100%', marginBottom: 8 }} 
            >              
              <Form.Item
                {...restField}
                name={[name, 'last']}
                label="Ingredients"
                style={{ width: '100%' }} 
                rules={[{ required: true, message: 'Please input an ingredient' }]}
              >
                <Input placeholder="Ingredient" />
              </Form.Item>
              <MinusCircleOutlined 
                style={{ marginLeft: 8, cursor: 'pointer' }} 
                onClick={() => remove(name)} 
              />
            </Space>          
          ))}
          <Form.Item>
            <Button 
              type="dashed" 
              onClick={() => add()} 
              block 
              icon={<PlusOutlined />}
            >
              Add ingredient
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Form>
);

export default CreateRecipe;