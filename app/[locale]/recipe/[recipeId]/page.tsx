"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import TitleComponent from "@/app/ui/title-component/TitleComponent";

import { Divider, Flex, Button, Typography, Modal } from "antd";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';

import LinkComponent from "@/app/ui/link/LinkComponent";
import { useLanguage } from "@/app/store/store";
import { CheckCircleOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { GetData } from "@/app/services/get-data";
import { RecipeInterface } from "@/app/types/interfaces";
import PageLoader from "@/app/ui/page-loader/PageLoader";
import { DeleteData } from "@/app/services/delete-data";
import { useRouter } from "next/navigation";

const Recipe = ({ params }: { params: { recipeId: string } }) => {
  const [recipe, setRecipe] = useState<RecipeInterface>();
  const [loading, setLoading] = useState(false);

  const t = useTranslations("translations");
  const { language } = useLanguage();
  const router = useRouter();

  const timeLanguageParser = language === 'ua' ? 'uk' : 'en';

  useEffect(() => {
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

    fetchRecipe();
  }, [params.recipeId]);

  const deleteRecipe = (recipeId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this recipe?',
      content: 'Once deleted, this action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        setLoading(true);
  
        DeleteData.deleteRecipe(recipeId)
          .then(() => {
            Modal.success({
              title: 'Recipe Deleted',
              content: 'The recipe has been successfully deleted.',
              okText: 'OK',
              onOk: () => {
                setTimeout(() => {
                  router.push(`/${language}/recipe`);
                }, 400);                
              }
            });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  };

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
          src={recipe.imageUrl}
          alt={recipe.title}
          width={300}
          height={300}
          style={{ borderRadius: "4px" }}
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
        >
          {t("pages.reactCourse.editRecipe")}
        </Button>
      </Flex>      
    </>
  );
};

export default Recipe;
