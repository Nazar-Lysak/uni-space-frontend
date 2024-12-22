"use client";
import { useState, useEffect } from "react";

import { useTranslations } from 'next-intl';

import { GetData } from "@/app/services/get-data";
import Loader from "@/app/ui/loader/Loader";
import { Table, Typography } from "antd";

interface User {
    _id: string;
    email: string;
    market: string;
    name: string;
    role: string;
    createdAt: string;
}

const { Title } = Typography;

const UserList: React.FC = () => {

    const [userList, setUserList] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const t = useTranslations("translations");

    useEffect(() => {   
        GetData.users().then(
            response => setUserList(response.data)
        );
    }, [])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };

    const paginationConfig = userList.length >= 10 ? {
        current: currentPage,
        pageSize: 10,
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

    return (
        <>
            <Title level={3}>{t("pages.admin.usersTable.userTableTitle")}</Title>
            {
                userList.length 
                    ? <Table 
                        dataSource={userList.map((user, i) => ({ ...user, key: i }))} 
                        columns={columns} 
                        pagination={paginationConfig}
                    />
                    : <Loader />
            }
            
        </>
    );
};

export default UserList;
