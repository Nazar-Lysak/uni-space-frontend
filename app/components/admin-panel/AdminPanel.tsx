'use client'

import { SettingOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { useTranslations } from 'next-intl';
import { useLanguage } from "@/app/store/store";
import LinkComponent from "@/app/ui/link/LinkComponent";



const AdminPannel: React.FC = () => {

    const t = useTranslations("translations");
    const { language } = useLanguage();

    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'home',
            icon: <FileTextOutlined />,
            label: (
                <LinkComponent 
                    url={`/${language}`} 
                    title={t("pages.home.linkLabel")} 
                />
            )
        },
        {
            key: 'content',
            icon: <FileTextOutlined />,
            label: (
                <LinkComponent 
                    url={`/${language}/admin/content`} 
                    title={t("pages.content.linkLabel")} 
                />
            ),
            children: [
                {
                    type: 'item',
                    key: 'all-contents',
                    label: (
                        <LinkComponent 
                            url={`/${language}/admin/content/content-list`} 
                            title={t("pages.copydeck.links.contentList")} 
                        />
                    ),
                },
                {
                    type: 'item',
                    key: 'create-content',
                    label: (
                        <LinkComponent 
                            url={`/${language}/admin/content/create-content`} 
                            title={t("pages.copydeck.links.contenCreate")} 
                        />
                    ),
                },
                {
                    type: 'item',
                    key: 'create-content-template',
                    label: (
                        <LinkComponent 
                            url={`/${language}/admin/content/create-content-template`} 
                            title={t("pages.copydeck.links.contenTemplateCreate")} 
                        />
                    ),
                },
            ]
        },
        {
            key: 'configuration',
            icon: <SettingOutlined />,
            label: (
                <LinkComponent 
                    url={`/${language}/admin/configuration`} 
                    title={t("pages.configuration.linkLabel")} 
                />
            )
        },
        {        
            key: 'people',
            icon: <UserOutlined />,
            label: (
                <LinkComponent 
                    url={`/${language}/admin/people`} 
                    title={t("pages.people.linkLabel")} 
                />
            ),
            children: [
                {
                    type: 'item',
                    key: 'all-users',
                    label: (
                        <LinkComponent 
                            url={`/${language}/admin/people/all-users`} 
                            title={t("pages.people.allUsers.linkLabel")} 
                        />
                    ),
                }       
            ],
        },
        {
            key: 'alipay',
            label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
            ),
        },
    ];

    return <Menu mode="horizontal" items={items} />;
};

export default AdminPannel;