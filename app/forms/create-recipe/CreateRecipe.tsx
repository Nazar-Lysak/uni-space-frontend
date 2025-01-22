import React, { useEffect } from 'react';
import { Form, Input, Select, Space, Button, FormInstance } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { RecipeInterface } from '@/app/types/interfaces';
import { useTranslations } from 'next-intl';
const { Option } = Select;
const { TextArea } = Input;

interface Recipe {
  Complexity: number;
  image: string;
  ingredients: { last: string }[];
  instructions: string;
  short: string;
  title: string;
}

interface CreateRecipeProps {
  form: FormInstance;
  recipe?: RecipeInterface;
  onSubmit?: (values: Recipe) => void;  
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ form, onSubmit, recipe }) => {

  const t = useTranslations("translations");

  useEffect(() => {
    if (recipe && recipe.ingredients?.length > 0) {
      form.setFieldsValue({
        title: recipe.title || "",
        Complexity: recipe.difficulty || "",
        image: recipe.imageUrl || "",
        short: recipe.shortDescription || "",
        instructions: recipe.instructions || "",
        ingredients: recipe.ingredients.map((ingredient) => ({ last: ingredient })) || [{}],
      });
    }
  }, [recipe, form]);
  
  return (
  
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
      title: recipe?.title || "",
      Complexity: recipe?.difficulty || "",
      image: recipe?.imageUrl || "",
      short: recipe?.shortDescription || "",
      instructions: recipe?.instructions || "",
      ingredients: recipe?.ingredients?.map(ingredient => ({ last: ingredient })) || [{}],
    }}
    onFinish={onSubmit}
  >
    <Form.Item label={t("pages.reactCourse.createRecipeForm.recipeTitle")} name="title" rules={[{ required: true }]}>
      <Input/>
    </Form.Item>

    <Form.Item
      label={t("pages.reactCourse.createRecipeForm.complexity")}
      name="Complexity"
      rules={[{ required: true, message: t("pages.reactCourse.createRecipeForm.inputComplexity") }]}
    >
      <Select 
        placeholder="Select complexity" 
        
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <Option key={value} value={value.toString()}>
            {value}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item label={t("pages.reactCourse.createRecipeForm.image")} name="image" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item
      name="short"
      label={t("pages.reactCourse.createRecipeForm.shortDescr")}
      rules={[{ required: true, message: t("pages.reactCourse.createRecipeForm.shortDescr") }]}
    >
      <TextArea showCount maxLength={300} />
    </Form.Item>

    <Form.Item
      name="instructions"
      label={t("pages.reactCourse.createRecipeForm.instructions")}
      rules={[{ required: true, message: t("pages.reactCourse.createRecipeForm.inputInstructions") }]}
    >
      <TextArea showCount maxLength={600} />
    </Form.Item>

    <Form.List name="ingredients">
    {(fields, { add, remove }) => (
      <>    
        {recipe && recipe?.ingredients?.length > 0
          ? fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: 'flex', width: '100%', marginBottom: 8 }}
            >
              <Form.Item
                {...restField}
                name={[name, 'last']}
                label={t("pages.reactCourse.createRecipeForm.ingredient")}
                style={{ width: '100%' }}
                rules={[{ required: true, message: t("pages.reactCourse.createRecipeForm.inputIngredient") }]}
              >
                <Input placeholder={t("pages.reactCourse.createRecipeForm.ingredient")}/>
              </Form.Item>
              <MinusCircleOutlined
                style={{ marginLeft: 8, cursor: 'pointer' }}
                onClick={() => remove(name)}
              />
            </Space>
          ))
          :
          fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: 'flex', width: '100%', marginBottom: 8 }}
            >
              <Form.Item
                {...restField}
                name={[name, 'last']}
                label={t("pages.reactCourse.createRecipeForm.ingredient")}
                style={{ width: '100%' }}
                rules={[{ required: true, message: t("pages.reactCourse.createRecipeForm.inputIngredient") }]}
              >
                <Input placeholder={t("pages.reactCourse.createRecipeForm.ingredient")} />
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
              {t("pages.reactCourse.createRecipeForm.addIngredient")}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>

  </Form>
)};

export default CreateRecipe;