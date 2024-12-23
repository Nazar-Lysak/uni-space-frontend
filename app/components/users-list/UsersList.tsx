"use client";
import { useState, useEffect } from "react";

import { useTranslations } from 'next-intl';
import { GetData } from "@/app/services/get-data";
import Loader from "@/app/ui/loader/Loader";
import { Table, Input, Space  } from "antd";
import TitleComponent from "@/app/ui/title-component/TitleComponent";
import { User } from "@/app/types/interfaces";

const UserList: React.FC = () => {

  const [userList, setUserList] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1);

  const t = useTranslations("translations");

  const { Search } = Input;

  useEffect(() => {   
    GetData.users().then(
      response => setUserList(response.data)
    );
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (inputValue:string) => {
    setSearchUser(inputValue)
  }

  const paginationConfig = userList.length >= 8 ? {
    current: currentPage,
    pageSize: 8,
    onChange: handlePageChange,
  } : false;

  const columns = [
    {
      title: t("pages.admin.usersTable.email"),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t("pages.admin.usersTable.market"),
      dataIndex: 'market',
      key: 'market',
    },
    {
      title: t("pages.admin.usersTable.name"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t("pages.admin.usersTable.role"),
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: t("pages.admin.usersTable.createdAt"),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const filterUserList = (userList: User[]): (User & { key: string })[] => {
    return userList
      .filter(el => searchUser.length === 0 
        || el.email.toLocaleLowerCase()
        .includes(searchUser.toLocaleLowerCase()))
      .map((user) => ({ ...user, key: user._id }));
  }

  return (
    <>
      <TitleComponent 
        level={3} 
        title={t("pages.admin.usersTable.userTableTitle")}
      />
      <Space direction="vertical"  style={{ width: '100%' }}>
        <Search 
          placeholder={t("placeholders.searchByEmail")} 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </Space>
      {
        userList.length 
        ? <Table 
          dataSource={filterUserList(userList)} 
          columns={columns} 
          pagination={paginationConfig}
        />
        : <Loader />
      }        
    </>
  );
};

export default UserList;
