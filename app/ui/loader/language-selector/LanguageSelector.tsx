'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { availableTranslations } from '@/locales/variables';

import { useLanguage } from '@/app/store/store';
import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();
    const { push } = useRouter();
    const pathname = usePathname();

    const handleChange = (value: string) => {
        const pathWithoutLang = pathname.split('/').slice(2).join('/'); 
        const newPath = `/${value}/${pathWithoutLang}`; 
        setLanguage(value);
        push(newPath); 
    };

    const items = availableTranslations.map((translate) => ({
        label: translate,
        key: translate,
        onClick: () => handleChange(translate),
    }));

    useEffect(() => {
        const pathLang = pathname.split('/')[1];
        if (availableTranslations.includes(pathLang) && pathLang !== language) {
            setLanguage(pathLang);
        }
    }, [pathname, language, setLanguage]);

    return (
        <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {language}
                    <GlobalOutlined style={{ fontSize: '24px' }} />
                </Space>
            </a>
        </Dropdown>
    );
};

export default LanguageSelector;
