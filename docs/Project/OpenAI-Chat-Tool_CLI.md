# OpenAI Chat Tool CLI
<br>
<div style="white-space: nowrap; display: flex; flex-wrap: nowrap; gap: 5px;">
  <a href="https://github.com/MiaowCham/CMD_Open-AI_Chat_Tool/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-orange.svg" alt="MIT" style="display: inline-block;"></a>
  <a href="https://github.com/search?q=repo%3AMiaowCham%2FCMD_Open-AI_Chat_Tool++language%3APython&type=code"><img src="https://img.shields.io/badge/Languages-Python-blue.svg" alt="Static Badge" style="display: inline-block;"></a>
  <a href="https://github.com/MiaowCham/CMD_Open-AI_Chat_Tool/releases"><img src="https://img.shields.io/github/v/release/MiaowCham/CMD_Open-AI_Chat_Tool" alt="Github Release" style="display: inline-block;"></a>
  <a href="https://github.com/MiaowCham/CMD_Open-AI_Chat_Tool/actions/workflows/build.yml"><img src="https://img.shields.io/github/actions/workflow/status/MiaowCham/CMD_Open-AI_Chat_Tool/.github/workflows/build.yml" alt="GitHub Actions" style="display: inline-block;"></a>
</div>  

>[!note]
>本项目的重构正式版本由 @MiaowCham 设计，使用 [Trae IDE](https://www.trae.ai/) 的 [Solo 模式](https://www.trae.ai/solo) 完成代码的实现  
>AI太好用了你们知道吗

一个功能丰富的命令行 OpenAI 聊天工具，支持多种模型、多语言界面和智能功能  
你可以直接克隆仓库并运行 `main.py` 来使用  
或者前往 [Release](https://github.com/MiaowCham/CMD_Open-AI_Chat_Tool/releases/latest) 页面下载构建好的可执行文件

> 哦当然你也可以去 [Actions](https://github.com/MiaowCham/CMD_Open-AI_Chat_Tool/actions/workflows/build.yml) 页面下载实时构建的最新版本
不用担心无法运行，我在同步到 Github 前会测试的

## 特征
使用 OpenAI 库编写的功能丰富的命令行 AI 聊天工具  
支持多种 API 和模型，具备完整的对话管理和智能功能

### 核心功能
<input type="checkbox" checked disabled> **多配置管理** - 支持多个 AI 配置，可快速切换不同的模型和设置  
<input type="checkbox" checked disabled> **多语言界面** - 支持中文/英文界面切换 (`/lang` 命令)  
<input type="checkbox" checked disabled> **智能历史记录** - 自动保存对话历史，支持智能总结压缩  
<input type="checkbox" checked disabled> **模板变量系统** - 支持时间相关模板变量 (`{{time}}`, `{{date}}`, `{{datetime}}` 等)  
<input type="checkbox" checked disabled> **多行输入** - 支持 Alt+Enter 换行，提升输入体验  
<input type="checkbox" checked disabled> **丰富的文字提示** - 支持彩色输出和用户友好的界面  
<input type="checkbox" checked disabled> **Markdown 终端渲染支持** - 基于 Rich 库实现的美丽的 Markdown 渲染  
<input type="checkbox" checked disabled> **API Key 校验** - 自动验证 API 密钥可用性  
<input type="checkbox" checked disabled> **指令系统** - 丰富的命令支持 (`/help`, `/config`, `/history`, `/lang` 等)  
<input type="checkbox" checked disabled> **多平台支持** - 支持 Windows、Linux、macOS  

### 配置管理
<input type="checkbox" checked disabled> 使用 `.octool_cli\config.yaml` 记录配置信息  
<input type="checkbox" checked disabled> 支持配置的增删改查和别名设置  
<input type="checkbox" checked disabled> 多语言配置名称和欢迎消息  
<input type="checkbox" checked disabled> 自动时间信息注入  

### 智能功能
<input type="checkbox" checked disabled> 对话历史自动管理和压缩  
<input type="checkbox" checked disabled> 智能总结功能，节省 token 消耗  
<input type="checkbox" checked disabled> 实时模板变量替换  
<input type="checkbox" checked disabled> 自动配置向后兼容  

### 依赖包列表:
 - **openai** - OpenAI API 客户端
 - **pyyaml** - YAML 配置文件处理
 - **packaging** - 版本管理
 - **prompt-toolkit** - 多行输入和终端交互
 - **rich** - 对 Markdown 在命令行渲染的支持
 - **tiktoken** - Token 计算和编码处理
 - **pyinstaller**（可选，用于 `build_exe.py` 构建可执行文件）

### 安装方法

#### 方法一：使用 requirements.txt（推荐）
```bash
pip install -r requirements.txt
```

#### 方法二：手动安装
```bash
pip install openai pyyaml packaging prompt-toolkit rich tiktoken
# 如需构建可执行文件
pip install pyinstaller
```

## 使用方法

### 快速开始
1. 克隆仓库：`git clone https://github.com/MiaowCham/CMD_Open-AI_Chat_Tool.git`
2. 安装依赖：`pip install -r requirements.txt`
3. 运行程序：`python main.py`
4. 首次运行会引导你配置 API 密钥和基本设置

### 命令行参数
```bash
# 交互模式（默认）
python main.py

# 极简模式
python main.py --simple --prompt "你的问题" --key "your_api_key"

# 指定配置
python main.py --config config_name
```

### 主要命令
- `/help` - 显示帮助信息
- `/config list` - 列出所有配置
- `/config switch <id>` - 切换配置
- `/config new` - 创建新配置
- `/history` - 查看历史记录统计
- `/lang switch <language>` - 切换界面语言
- `/clear` - 清屏
- `/exit` - 退出程序

## 许可证
本项目使用 MIT 许可证
