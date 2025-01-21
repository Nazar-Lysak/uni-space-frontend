"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import TitleComponent from "@/app/ui/title-component/TitleComponent";

import { Divider, Flex, Button, Typography, Modal, Form, message } from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';

import LinkComponent from "@/app/ui/link/LinkComponent";
import { useLanguage } from "@/app/store/store";
import { CheckCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { GetData } from "@/app/services/get-data";
import { RecipeInterface, RecipePostData } from "@/app/types/interfaces";
import PageLoader from "@/app/ui/page-loader/PageLoader";
import { DeleteData } from "@/app/services/delete-data";
import { useRouter } from "next/navigation";
import DrawerComponent from "@/app/ui/drawer-component/DrawerComponent";
import CreateRecipe from "@/app/forms/create-recipe/CreateRecipe";
import { PutData } from "@/app/services/put-data";

interface Ingredient {
  last: string;
}

interface Recipe {
  title: string;
  image: string;
  short: string;
  Complexity: number;
  ingredients: Ingredient[];
  instructions: string;
}

const Recipe = ({ params }: { params: { recipeId: string } }) => {
  const [recipe, setRecipe] = useState<RecipeInterface>();
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const t = useTranslations("translations");
  const { language } = useLanguage();
  const router = useRouter();
  const [form] = Form.useForm();

  const timeLanguageParser = language === 'ua' ? 'uk' : 'en';

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await GetData.currentRecipe(params.recipeId);
      setRecipe(response.data);        
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [params.recipeId]);
  
  const deleteRecipe = (recipeId: string) => {
    Modal.confirm({
      title: t("pages.reactCourse.recipePage.deleteRecipe"),
      content: t("pages.reactCourse.recipePage.deleteRecipeContent"),
      okText: t("pages.reactCourse.recipePage.deleteAllow"),
      okType: 'danger',
      cancelText: t("pages.reactCourse.recipePage.deleteDisallow"),
      onOk: () => {
        setLoading(true);
  
        DeleteData.deleteRecipe(recipeId)
          .then(() => {
            Modal.success({
              title: t("pages.reactCourse.recipePage.recipeDeleted"),
              content: t("pages.reactCourse.recipePage.recipeDeletedContent"),
              okText: t("pages.reactCourse.recipePage.ok"),
              onOk: () => {
                setTimeout(() => {
                  router.push(`/${language}/recipe`);
                }, 400);                
              }
            });
          })
          .finally(() => {
            setLoading(false);
            fetchRecipe();
          });
      }
    });
  };

  const editRecipe = (values: Recipe) => {

    const ingredientsList: (string | number)[] = values.ingredients.map((ingredient) => ingredient.last);
  
    Modal.confirm({
      title: t("pages.reactCourse.recipePage.sureToRemove"),
      content: t("pages.reactCourse.recipePage.confirmRemove"),

      onOk: () => {
        setLoading(true);
        const updatedRecipeData:RecipePostData = {
          "title": values.title,
          "imageUrl": values.image,
          "shortDescription": values.short,
          "difficulty": Number(values.Complexity),
          "ingredients": ingredientsList, 
          "instructions": values.instructions,
          "createdBy": "user"
        };
    
        PutData.putRecipe(params.recipeId, updatedRecipeData)
          .then(() => {
            form.resetFields();
            setShowDrawer(false);
            messageApi.success(t("pages.reactCourse.recipePage.recipeEdited"));
          })
          .catch((error) => {
            messageApi.error("Error editing recipe");
            console.error("Error editing recipe", error);
          })
          .finally(() => {
            setLoading(false);
            fetchRecipe();
          });
      },
      onCancel: () => {
        console.log('Recipe creation canceled');
      }
    });
  }

  if (loading) {
    return <PageLoader />
  }

  if (!recipe?._id) {
    return (
      <TitleComponent
        level={1}
        title={t("pages.reactCourse.recipeTable.recipeNotFound")}
      />
    );
  }

  return (
    <>
      {contextHolder}
      <Flex align="center" justify="space-between">
        <TitleComponent level={1} title={recipe.title} />
        <LinkComponent
          url={`/${language}/recipe`}
          title={t("pages.reactCourse.recipeTable.backToRecipeList")}
        />
      </Flex>

      <Divider />
      <Flex gap={5} align="center">
        <TitleComponent
          level={3}
          title={`${t("pages.reactCourse.recipeTable.complexity")}:`}
        />
        {Array.from({ length: 5 }, (_, index) => (
          index < recipe.difficulty ? (
            <StarFilled key={index} style={{ marginBottom: "5px" }} />
          ) : (
            <StarOutlined key={index} style={{ marginBottom: "5px" }} />
          )
        ))}
      </Flex>     

      <Divider />

      <Flex style={{ paddingBottom: "20px" }}>
        <Image
          src={recipe?.imageUrl || ""}
          alt={recipe?.title || "Recipe Image"}
          width={300}
          height={200} 
          style={{
            borderRadius: "4px",
          }}
          unoptimized
          priority
        />
        <p style={{ padding: "0 40px" }}>{recipe.instructions}</p>
      </Flex>

      <Divider />

      <TitleComponent
        level={2}
        title={t("pages.reactCourse.recipeTable.ingredients")}
      />
      <ul>
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <CheckCircleOutlined style={{ marginRight: "10px" }} />
            {ingredient}
          </li>
        ))}
      </ul>
      <Flex justify="end" gap={20}>
        <Typography.Title level={5}>
          {recipe.createdBy} | {dayjs(recipe.createdAt).locale(timeLanguageParser).format('D MMMM YYYY, HH:mm')}
        </Typography.Title>
      </Flex>

      <Divider />

      <Flex justify="end" gap={20}>
        <Button 
          type="primary" 
          danger
          onClick={() => deleteRecipe(params.recipeId)}
        >
          {t("pages.reactCourse.deleteRecipe")}
        </Button>
        <Button 
          type="primary"
          onClick={() => setShowDrawer(true)}
        >
          {t("pages.reactCourse.editRecipe")}
        </Button>
      </Flex>    
      <DrawerComponent 
          showDrawer={showDrawer}
          closeDrawer={setShowDrawer}
          drawerTitle={t("pages.reactCourse.editRecipe")}
          form={form}
        >     
          <CreateRecipe 
            form={form} 
            onSubmit={editRecipe}
            recipe={recipe}
          />
        </DrawerComponent>   
    </>
  );
};

export default Recipe;
