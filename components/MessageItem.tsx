
import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Message, SenderType } from '../types';

interface MessageItemProps {
  message: Message;
  style?: React.CSSProperties;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, style }) => {
  const isAgent = message.senderType === SenderType.Agent;

  const wrapperClasses = `flex items-start gap-3 p-4 ${isAgent ? 'flex-row-reverse' : ''}`;
  const bubbleClasses = `max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
    isAgent ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'
  }`;
  
  return (
    <div style={style} className={wrapperClasses}>
      <Avatar 
        size="large" 
        icon={isAgent ? <CustomerServiceOutlined /> : <UserOutlined />} 
        className={isAgent ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
      />
      <div className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <Typography.Text className="font-semibold text-gray-700">{message.senderName}</Typography.Text>
          <Typography.Text type="secondary" className="text-xs">{message.timestamp}</Typography.Text>
        </div>
        <div className={bubbleClasses}>
          <Typography.Text className={isAgent ? 'text-white' : 'text-gray-800'}>{message.content}</Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
