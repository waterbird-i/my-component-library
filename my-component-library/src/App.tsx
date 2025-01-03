import './App.css'
import MyForm from './components/MyFrom'
import { Field } from './components/MyFrom/types'

function App() {
  const fields: Field[] = [
    {
      name: 'username',
      label: '用户名',
      type: 'text' as const,
      required: true,
      placeholder: '请输入用户名',
      validate: (value: string) => 
        value.length < 3 ? '用户名长度不能小于3位' : undefined
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'email' as const,
      required: true,
      placeholder: '请输入邮箱地址'
    },
    {
      name: 'role',
      label: '角色',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'admin', label: '管理员' },
        { value: 'user', label: '普通用户' }
      ]
    }
  ];

  const handleSubmit = async (data: { [key: string]: string }) => {
    // 模拟异步提交
    console.log('表单数据：', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSuccess = () => {
    alert('提交成功！');
  };

  return (
    <>
      <div className="form-container">
        <h1>用户注册</h1>
        <MyForm 
          fields={fields}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
          className="register-form"
        />
      </div>
    </>
  )
}

export default App
