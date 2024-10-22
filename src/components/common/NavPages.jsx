import React from 'react';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';

const BreadcrumbComponent = ({ items }) => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <Breadcrumb className='mb-5'>
            {items?.map((item, index) => (
                <Breadcrumb.Item className='cursor-pointer' key={index} onClick={() => handleClick(item.path)}>
                    {item.label}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>   
    );
};

export default BreadcrumbComponent;
