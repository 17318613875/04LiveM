export const InputRule = (key, message) => ({
  [key]: [
    { required: true, message: `请输入${message}`, trigger: 'blur' },
    { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' },
  ],
});

export const SelectRule = (key, message) => ({
  [key]: [{ required: true, message: `请选择${message}`, trigger: 'change' }],
});
