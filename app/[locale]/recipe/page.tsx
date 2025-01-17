"use client";
import { ColumnsType } from "antd/es/table";
import { useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";
import Image from 'next/image'

import { useTranslations } from 'next-intl';
import TitleComponent from "@/app/ui/title-component/TitleComponent";

import { Table, Input, Space, Flex, Button } from "antd";
const { Search } = Input;

import {dataRecipes} from './recipes.js';

interface Recipe {
  key: string;
  id: string;
  image: string;
  title: string;
  description: string;
  complexity: number;
}

const Recipe: React.FC = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchRecipe, setSearchRecipe] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const page = searchParams.get("page") || '1';
    setCurrentPage(Number(page));
  }, [])

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

  const columns: ColumnsType<Recipe> = [    
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
      sorter: (a:Recipe, b:Recipe) => a.title.localeCompare(b.title)
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
      sorter: (a:Recipe, b:Recipe) => a.complexity - b.complexity,
    },
  ];
  
  const recipeList = dataRecipes
    .filter(recipe => searchRecipe.length === 0 
      || recipe.name.toLocaleLowerCase()
      .includes(searchRecipe.toLocaleLowerCase()))
    .map(recipe => {
      return ({
        key: recipe.id,
        id: recipe.id,
        image: recipe.photo,
        title: recipe.name,
        description: recipe.description,
        complexity: recipe.difficultyLevel
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
          <Button type="primary">
            {t("pages.reactCourse.createRecipe")}
          </Button>
        </Flex>
        

        <Table 
          dataSource={recipeList} 
          columns={columns} 
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
            style: { cursor: 'pointer' }
          })}
          pagination={paginationConfig}
        />
      </Space>
    </>
  );
}

export default Recipe;