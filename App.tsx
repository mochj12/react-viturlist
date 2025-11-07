import React, { useState, useEffect } from 'react';
// FIX: Alias Card to AntdCard to prevent potential naming conflicts.
import { Card as AntdCard, Spin } from 'antd';
import { Virtuoso } from 'react-virtuoso';
import { Message, SenderType } from './types';
import MessageItem from './components/MessageItem';

const TOTAL_MESSAGES = 10000;
const CONTAINER_HEIGHT = 700;

// Mock data generation with more varied content length
const generateMockMessages = (count: number): Message[] => {
  const messages: Message[] = [];
  const customerNames = ['小明', '李华', '张伟'];
  const agentNames = ['客服-小王', '客服-小李'];
  const sampleContent = [
    // Short
    '你好', '在吗？', '好的', '谢谢!', '收到。',
    // Medium
    '你好，请问有什么可以帮助您？',
    '我的订单好像出了一些问题。',
    '请您提供一下订单号，我帮您查询一下。',
    '订单号是 20240801ABCDE。',
    '好的，请稍等，正在为您查询...',
    // Long
    '查询到了，您的订单由于地址信息不完整导致派送失败。我们需要您提供详细的收货地址，包括省、市、区、街道、小区、楼号、单元和门牌号，以便我们为您更新系统信息并重新安排快递员进行派送。',
    '啊？那我应该怎么办？是不是需要重新下单？还是说只要更新地址就可以了？如果重新下单的话，我之前用的优惠券还能用吗？',
    '您不需要重新下单。您只需在这里提供一下详细的收货地址，我们后台的管理人员会手动为您更新订单信息，然后系统会自动触发重新派送的流程。这个过程不会影响您的任何优惠券或订单状态。',
    '好的，我的详细地址是：xx省xx市xx区xx街道xx路xx号xx小区xx栋xx单元xxxx室。麻烦你们尽快处理了，这个东西我等着急用。',
    '信息已更新成功！我们会立即为您安排仓库加急发货，预计今天内就能出库，明天您应该就能看到最新的物流动态了。非常感谢您的耐心等待与配合！',
    '太好了，这下我放心了，你们的服务效率真高！',
    '这是我们应该做的，能够帮助到您是我们的荣幸。后续有任何问题，也欢迎您随时联系我们。祝您生活愉快！',
  ];

  let lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - Math.floor(count / 24));

  for (let i = 0; i < count; i++) {
    const isAgent = i % 3 !== 1;
    lastDate.setHours(lastDate.getHours() + (i % 5)); // More varied time
    lastDate.setMinutes(lastDate.getMinutes() + (i % 59));

    messages.push({
      id: i,
      senderType: isAgent ? SenderType.Agent : SenderType.Customer,
      senderName: isAgent ? agentNames[i % agentNames.length] : customerNames[i % customerNames.length],
      avatar: `https://i.pravatar.cc/40?u=${i % 10}`,
      content: sampleContent[i % sampleContent.length],
      timestamp: lastDate.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    });
  }
  return messages;
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching a large dataset
    setTimeout(() => {
      setMessages(generateMockMessages(TOTAL_MESSAGES));
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans">
      <AntdCard
        title={`客服对话 (${TOTAL_MESSAGES} 条消息)`}
        bordered={false}
        className="w-full max-w-3xl shadow-lg"
        headStyle={{ backgroundColor: '#f0f2f5' }}
      >
        <div className="h-[700px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spin size="large" tip="正在加载大量消息..." />
            </div>
          ) : (
            <Virtuoso
              style={{ height: CONTAINER_HEIGHT }}
              data={messages}
              itemContent={(index, message) => (
                <MessageItem key={message.id} message={message} />
              )}
            />
          )}
        </div>
      </AntdCard>
    </div>
  );
};

export default App;
