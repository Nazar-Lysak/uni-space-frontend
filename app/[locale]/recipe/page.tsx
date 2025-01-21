"use client";
import { ColumnsType } from "antd/es/table";
import { useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import Image from 'next/image'

import { useTranslations } from 'next-intl';
import TitleComponent from "@/app/ui/title-component/TitleComponent";

import { Table, Input, Space, Flex, Button, Form, message } from "antd";
const { Search } = Input;

import { GetData } from "@/app/services/get-data";
import { RecipeInterface } from "@/app/types/interfaces";
import DrawerComponent from "@/app/ui/drawer-component/DrawerComponent";
import CreateRecipe from "@/app/forms/create-recipe/CreateRecipe";
import { PostData } from "@/app/services/post-data";

interface columnType {
  key: string;
  id: string;
  image: string;
  title: string;
  description: string;
  complexity: number;
}

interface Ingredient {
  last: string;
}

interface Recipe {
  complexity: number;
  image: string;
  ingredients: Ingredient[];
  instructions: string;
  short: string;
  title: string;
}

const Recipe: React.FC = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  const [searchRecipe, setSearchRecipe] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const getRecipes = useCallback(() => {
    setLoading(true);
    GetData.recipes()
      .then((response) => {
        setRecipes(response.data);
      })
      .finally(() => {
        setLoading(false); 
      });
    
    const page = searchParams.get("page") || '1';
    setCurrentPage(Number(page));
  }, [searchParams]);

  useEffect(() => {   
    getRecipes();
  }, [searchParams, getRecipes]);

  const t = useTranslations("translations");  
  
  const onSearch = (inputValue:string) => {
    setSearchRecipe(inputValue)
  }

  const handleRowClick = (id:string) => {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}/${id}`)
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      router.replace("?");
    } else {
      router.replace(`?page=${page}`);
    }    
  };

  const closeDrawer = (bool: boolean) => {
    setShowDrawer(bool);
    form.resetFields();
  }

  const addRecipe = (values: Recipe) => {

    console.log(values)

    const ingredientsList: (string | number)[] = values.ingredients.map((ingredient) => ingredient.last);

    const recipeData = {
      "title": values.title,
      "imageUrl": values.image,
      "shortDescription": values.short,
      "difficulty": Number(values.complexity),
      "ingredients": ingredientsList,
      "instructions": values.instructions,
      "createdBy": "user"
    };

    setLoading(true)
    PostData.addRecipe(recipeData)
    .then(() => {
      form.resetFields();
      setShowDrawer(false);
      if (!loading && showDrawer) {
        message.success("Recipe created successfully!");        
      }
      getRecipes();      
    })
    .finally(() => {
      setLoading(false);         
    }) 
  }

  const columns: ColumnsType<columnType> = [    
    {
      title: t("pages.reactCourse.recipeTable.image"),
      dataIndex: 'image',
      key: 'image',
      width: '140px',
      render: (image:string) => {
        return <Image 
          src={image} 
          alt="Recipe" 
          width={50}
          height={50}
          unoptimized={true}
          style={{
            height: '50px',
            width: '50px',
            objectFit: 'cover',
            borderRadius: '4px'
          }}
        />
      }
    },
    {
      title: t("pages.reactCourse.recipeTable.title"),
      dataIndex: 'title',
      key: 'title',
      width: '25%',
      sorter: (a:columnType, b:columnType) => a.title.localeCompare(b.title)
    },
    {
      title: t("pages.reactCourse.recipeTable.description"),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t("pages.reactCourse.recipeTable.complexity"),
      dataIndex: 'complexity',
      key: 'complexity',
      width: '10%',
      sorter: (a: columnType, b: columnType) => (a.complexity ?? 0) - (b.complexity ?? 0)
    },
  ];
  
  const recipeList = recipes
    .filter(recipe => searchRecipe.length === 0 
      || recipe.title.toLocaleLowerCase()
      .includes(searchRecipe.toLocaleLowerCase()))
    .map(recipe => {
      return ({
        key: recipe._id,
        id: recipe._id,
        image: recipe.imageUrl,
        title: recipe.title,
        description: recipe.shortDescription,
        complexity: recipe.difficulty
      })
    })

    const paginationConfig = recipeList.length >= 5 ? {
      current: currentPage,
      pageSize: 5,
      onChange: handlePageChange,
    } : false;

  return (
    <>
      <TitleComponent 
        level={3} 
        title={t("pages.reactCourse.title")}
      />
      <Space direction="vertical"  style={{ width: '100%' }}>
        <Flex gap={40}>
          <Search 
            placeholder={t("pages.reactCourse.recipeSearch")} 
            onChange={(e) => onSearch(e.target.value)} 
          />
          <Button 
            type="primary"
            onClick={() => closeDrawer(true)}
          >
            {t("pages.reactCourse.createRecipe")}
          </Button>
        </Flex>
        <DrawerComponent 
          showDrawer={showDrawer}
          closeDrawer={setShowDrawer}
          drawerTitle={"Create Recipe"}
          form={form}
        >     
          <CreateRecipe 
            form={form} 
            onSubmit={addRecipe}
          />
        </DrawerComponent>   

        <Table 
          dataSource={recipeList} 
          columns={columns} 
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
            style: { cursor: 'pointer' }
          })}
          pagination={paginationConfig}
          loading={loading}
        />
      </Space>
    </>
  );
}

export default Recipe;