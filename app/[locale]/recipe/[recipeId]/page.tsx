'use client'

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import TitleComponent from '@/app/ui/title-component/TitleComponent';

import { Divider, Flex, Button } from 'antd';


import {dataRecipes} from '../recipes.js';
import LinkComponent from '@/app/ui/link/LinkComponent';
import { useLanguage } from "@/app/store/store";
import { CheckCircleOutlined, StarFilled, StarOutlined } from '@ant-design/icons';

const Recipe = ({ params }: {params: {recipeId: string}}) => {

  const t = useTranslations("translations");
  const { language } = useLanguage();

  const recipe = dataRecipes.filter(el => el.id === String(params.recipeId))[0];

  if (!recipe) {
    return ( 
      <>
        <TitleComponent 
          level={1} 
          title={t("pages.reactCourse.recipeTable.recipeNotFound")}
        />
      </>
    );
  }

  return ( 
    <>
    <Flex align={'center'} justify={'space-between'}>
      <TitleComponent 
        level={1} 
        title={recipe.name}
      />
      <LinkComponent 
        url={`/${language}/recipe`} 
        title={t("pages.reactCourse.recipeTable.backToRecipeList")} 
      />
    </Flex>      
      <Divider />
      <Flex gap={5}>
        <TitleComponent 
          level={3} 
          title={`${t("pages.reactCourse.recipeTable.complexity")}:`}
        />   
        {
          Array.from({ length: 5 }, (_, index) =>
            index < recipe.difficultyLevel 
              ? <StarFilled key={index} style={{marginBottom: '5px'}} /> 
              : <StarOutlined key={index} style={{marginBottom: '5px'}} />
          )
        }
        
      </Flex>
      <Flex style={{paddingBottom: '20px'}}>
        <Image 
          src={recipe.photo} 
          alt={recipe.name} 
          width={300}
          height={300}
          style={{
            borderRadius: '4px'
          }}
          unoptimized={true}
        />
        <p style={{padding: '0 40px'}}>
          {recipe.instructions}
        </p>
      </Flex>     
      <Divider />   
      <TitleComponent 
        level={2} 
        title={t("pages.reactCourse.recipeTable.ingredients")}
      />   
      <ul>
        {
          recipe.ingredients.map((ingredient, index) => {
            return (
              <li key={index} style={{marginBottom: "10px"}}>
                <CheckCircleOutlined 
                  style={{marginRight: '10px'}}
                />
                {ingredient}
              </li>
            )
          })
        }
      </ul>
      <Divider /> 
      <Flex justify='end' gap={20}>
        <Button type="primary" danger>{t("pages.reactCourse.deleteRecipe")}</Button>
        <Button type="primary">{t("pages.reactCourse.editRecipe")}</Button>
      </Flex>
    </>
  );
}

export default Recipe;