# TTML 转换器 (TTML Converter)

适用于 AMLL TTML Tools 制作的 TTML 歌词的快速格式化转换的 Python 命令行工具，以适配 Apple 官方标准。

### [点我前往获取](https://github.com/MiaowCham/Repository_for_MiaowCham/blob/main/project/ttml_converter.py)

## 使用方法

### 基础用法

```bash
python ttml_converter.py <input_file> [output_file]
```

### 参数说明

| 参数          | 必需 | 说明                                                                |
| ------------- | ---- | ------------------------------------------------------------------- |
| `input_file`  | 否   | 输入的 TTML 文件路径                                                |
| `output_file` | 否   | 输出文件路径。若不指定，将自动生成为 `{input_file}_converted.{ext}` |

### 使用示例

**示例 1：指定输出文件**
```bash
python ttml_converter.py lyrics.ttml converted_lyrics.ttml
```

**示例 2：自动生成输出文件名**
```bash
python ttml_converter.py lyrics.ttml
```
输出文件将被保存为 `lyrics_converted.ttml`

**示例 3：交互模式**
运行程序时不提供输入文件，将提示用户输入：
```bash
python ttml_converter.py
# 请输入要转换的 TTML 文件路径: /path/to/lyrics.ttml
```

## 技术细节

### 0. 依赖库

- `argparse` - 命令行参数解析
- `os` - 文件路径操作
- `xml.etree.ElementTree` - XML 处理
- `collections.OrderedDict` - 有序字典（保持属性顺序）

<details>
<summary>点击展开详细内容</summary>

### 1. 时间值规范化 (`normalize_time_value`)

将时间值转换为规范化格式，移除多余的前导零。

**示例**：
- `00:01:23` → `1:23`
- `00:00:45` → `0:45`
- `01:23:45` → `1:23:45`

### 2. 翻译收集 (`collect_translations`)

**功能**：从 TTML 文件中提取翻译信息

**处理逻辑**：
- 扫描所有 `<p>` 标签中带有 `itunes:key` 属性的元素
- 识别主翻译和背景翻译（通过 `ttm:role="x-bg"` 标识）
- 移除翻译节点，避免重复
- 返回字典格式：`{itunes_key: (main_translation, bg_translation)}`

**特殊处理**：
- 删除背景翻译容器中的 `begin` 和 `end` 属性
- 对翻译文本进行去空格处理
- 保留歌词中的其他 `span` 标签

### 3. iTunes 元数据创建 (`ensure_itunes_translation_metadata`)

**功能**：在 TTML 文件中创建 iTunes 元数据结构

**创建的结构**：
```xml
<metadata>
  <iTunesMetadata xmlns="http://music.apple.com/lyric-ttml-internal">
    <translations>
      <translation type="subtitle" xml:lang="zh-Hans-CN">
        <text for="key_value">main_translation
          <span xmlns:ttm="..." ttm:role="x-bg" xmlns="...">
            (bg_translation)
          </span>
        </text>
      </translation>
    </translations>
  </iTunesMetadata>
</metadata>
```

### 4. 属性重新排序 (`reorder_p_attributes`)

确保 `<p>` 标签的属性按正确顺序排列（`itunes:key` 和 `ttm:agent` 属性置于最后）。

## 支持的命名空间

| 前缀     | URI                                          | 用途                          |
| -------- | -------------------------------------------- | ----------------------------- |
| 默认     | `http://www.w3.org/ns/ttml`                  | TTML 标准元素                 |
| `ttm`    | `http://www.w3.org/ns/ttml#metadata`         | 元数据相关属性                |
| `itunes` | `http://music.apple.com/lyric-ttml-internal` | iTunes 特定属性               |
| `xml`    | `http://www.w3.org/XML/1998/namespace`       | XML 标准属性（如 `xml:lang`） |

## 输入输出格式

### 输入格式要求

TTML 文件应包含：
- 标准的 TTML 根元素和命名空间声明
- `<p>` 标签带有 `itunes:key` 属性
- 可选的 `<span>` 翻译节点，标记为 `ttm:role="x-translation"`
- 可选的背景翻译，包装在 `ttm:role="x-bg"` 的 span 中

**示例输入**：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<tt xmlns="http://www.w3.org/ns/ttml" xmlns:ttm="http://www.w3.org/ns/ttml#metadata"
    xmlns:itunes="http://music.apple.com/lyric-ttml-internal">
  <body>
    <div>
      <p begin="00:00:01" end="00:00:05" itunes:key="key1" ttm:agent="v1">
        <span begin="00:00:01" end="00:00:05">歌词</span>
        <span ttm:role="x-translation">翻译</span>
        <span ttm:role="x-bg">
          <span ttm:role="x-translation">背景翻译</span>
        </span>
      </p>
    </div>
  </body>
</tt>
```

### 输出格式特性

- 在 `<head>` 中创建或补充 `<metadata>` 元素
- 添加 `<iTunesMetadata>` 元素及其内部结构
- 保留原有的时间属性（规范化后）
- 移除提取的翻译节点

### 错误处理

程序会在以下情况抛出异常：

| 错误类型 | 原因 | 解决方法 |
|---------|------|--------|
| `FileNotFoundError` | 输入文件不存在 | 检查文件路径是否正确 |
| `ET.ParseError` | TTML 文件格式不合法 | 检查 XML 格式是否正确 |

</details>

## 常见问题

### Q: 转换失败怎么办？

A: 该项目只支持 AMLL TTML Tools 制作的 TTML 文件，尚未清楚其他来源 TTML 文件的兼容性问题。请确保输入文件符合规范。

### Q: 转换后的文件变大了，为什么？

A: iTunes 元数据结构增加了额外的 XML 节点，这是正常的。新增的元数据用于存储翻译信息。

### Q: 如何处理多语言翻译？

A: 当前版本固定为简体中文（`zh-Hans-CN`）。若需要其他语言，可修改 `ensure_itunes_translation_metadata()` 函数中的 `xml:lang` 属性值。

### Q: 转换是否会改变原始歌词时间轴？

A: 不会。原始歌词的 `begin` 和 `end` 属性会被保留（仅进行规范化处理）。只有背景翻译的时间属性会被移除。

### Q: 文件很大时，转换速度如何？

A: 程序采用流式 XML 解析，效率较高。即使是数 MB 级的 TTML 文件也能在数秒内完成转换。

## 许可证与声明

本项目由 VSCode 及 Github Copilot 强力驱动。
本项目使用 CC0 1.0 许可证。
