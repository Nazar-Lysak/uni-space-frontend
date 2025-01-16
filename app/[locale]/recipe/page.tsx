
"use client";
import { useState } from "react";
import Image from 'next/image'

import { useTranslations } from 'next-intl';
import TitleComponent from "@/app/ui/title-component/TitleComponent";

import { Table, Input, Space } from "antd";
const { Search } = Input;

const Recipe: React.FC = () => {

  const [searchRecipe, setSearchRecipe] = useState<string>('')

  const t = useTranslations("translations");   

  const onSearch = (inputValue:string) => {
    setSearchRecipe(inputValue)
  }

  const handleRowClick = (id:string) => {
    console.log('product ID:', id);
  };

  const columns = [    
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
        />
      }
    },
    {
      title: t("pages.reactCourse.recipeTable.title"),
      dataIndex: 'title',
      key: 'title',
      width: '25%',
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
    },
  ];

  const dataRecipes = [
    {
      "id": "1",
      "name": "Creamy Mushroom Pasta",
      "photo": "https://assets.bonappetit.com/photos/5d4ddd602c815a00080f9771/1:1/w_1920,c_limit/BA-0919-Creamy-Pasta-Crispy-Mushroom-Playbook.jpg",
      "description": "A rich and creamy pasta dish with sautéed mushrooms and garlic.",
      "difficultyLevel": 3,
      "ingredients": [
        "200g pasta",
        "250g mushrooms",
        "2 cloves garlic",
        "200ml heavy cream",
        "50g Parmesan cheese",
        "Salt and pepper to taste",
        "1 tbsp olive oil"
      ],
      "instructions": [
        "Cook the pasta according to package instructions.",
        "Heat olive oil in a pan and sauté minced garlic until fragrant.",
        "Add sliced mushrooms and cook until golden brown.",
        "Pour in heavy cream and simmer for 5 minutes.",
        "Mix in grated Parmesan cheese, salt, and pepper.",
        "Combine the pasta with the sauce and serve warm."
      ]
    },
    {
      "id": "2",
      "name": "Classic Caesar Salad",
      "photo": "https://www.allrecipes.com/thmb/GKJL13Wb8TZ9hpJ9c70v0aNXsyQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg",
      "description": "A fresh and crunchy Caesar salad with homemade dressing.",
      "difficultyLevel": 2,
      "ingredients": [
        "1 head romaine lettuce",
        "50g croutons",
        "50g Parmesan cheese",
        "1 egg yolk",
        "1 clove garlic",
        "1 tsp Dijon mustard",
        "2 tbsp lemon juice",
        "4 tbsp olive oil",
        "Salt and pepper to taste"
      ],
      "instructions": [
        "Wash and chop the romaine lettuce.",
        "Prepare the dressing by whisking egg yolk, minced garlic, Dijon mustard, lemon juice, and olive oil.",
        "Season the dressing with salt and pepper.",
        "Toss the lettuce with the dressing and top with croutons and shaved Parmesan."
      ]
    },
    {
      "id": "3",
      "name": "Chocolate Chip Cookies",
      "photo": "https://img.taste.com.au/FH2xb58L/taste/2010/01/choc-chip-cookies-image1-197537-1.jpg",
      "description": "Soft and chewy cookies loaded with chocolate chips.",
      "difficultyLevel": 4,
      "ingredients": [
        "200g all-purpose flour",
        "100g butter",
        "100g sugar",
        "50g brown sugar",
        "1 egg",
        "1 tsp vanilla extract",
        "1/2 tsp baking soda",
        "150g chocolate chips",
        "A pinch of salt"
      ],
      "instructions": [
        "Preheat the oven to 180°C (350°F).",
        "Cream together butter, sugar, and brown sugar until fluffy.",
        "Beat in the egg and vanilla extract.",
        "Mix in flour, baking soda, and salt until combined.",
        "Fold in the chocolate chips.",
        "Scoop dough onto a baking sheet and bake for 10-12 minutes until golden."
      ]
    }
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

  return (
    <>
      <TitleComponent 
        level={3} 
        title={t("pages.reactCourse.title")}
      />
      <Space direction="vertical"  style={{ width: '100%' }}>
        <Search 
          placeholder={t("pages.reactCourse.recipeSearch")} 
          onChange={(e) => onSearch(e.target.value)} 
        />

        <Table 
          dataSource={recipeList} 
          columns={columns} 
          onRow={(record) => ({
            onClick: () => handleRowClick(record.id),
            style: { cursor: 'pointer' }
          })}
        />
      </Space>
    </>
  );
}

export default Recipe;