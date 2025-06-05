---
title: 搭建hexo博客
tags:
  - 个站搭建
categories:
  - 个站搭建
description: 本文介绍了如何安装hexo并应用butterfly主题
abbrlink: 268d8d1e
date: 2023-10-26 05:36:00
update: 2025-6-4 18:00:00
---
### 1. 安装前的准备

安装 Hexo 相当简单，只需要先安装下列应用程序即可

- [Node.js](http://nodejs.org/) (本次使用 Node.js 22.14.0)
- [Git](http://git-scm.com/)

### 2. 安装Hexo

hexo官网:https://hexo.io/

所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。

```
#安装
npm install hexo-cli -g

#初始化
npx hexo init buxianxian

#进入项目
cd buxianxian

#安装依赖
npm install

#启动服务
npx hexo server

#查看hexo版本
hexo -v
```

### 3. 运行hexo

```
npx hexo cl && npx hexo g && npx hexo s
```

分别对应清除生成的静态文件，生成新的静态文件，启动项目

### 4. 访问

本地访问http://localhost:4000/

![image-20250605145349220](http://resources.buxianxian.cn/img-blog/20250605152227961.png?x-oss-process=style/style-blog)

### 5. 安装主题

以[butterfly主题](https://butterfly.js.org/)为例

> 可选git安装或者npm安装，建议用git安装，npm安装还需要从node_modules里把主题文件移出来。

#### 1. 通过git安装主题

在你的 Hexo 根目录里

```
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

#### 2. 应用主题

修改 Hexo 根目录下的 _config.yml，把主题改为 butterfly

```yml
theme: butterfly #大概在第99行
```

#### 3. 安装插件

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

#### 4. 优化设置

在 hexo 的根目录创建一个文件 _config.butterfly.yml，并把主题目录的 _config.yml 内容复制到 _config.butterfly.yml 去。

> 注意:
>
> 复制的是主题的 _config.yml ，而不是 hexo 的 _config.yml
>
> 不要把主题目录的 _config.yml 删掉
>
> 以后只需要在 _config.butterfly.yml 进行配置就行。如果使用了 _config.butterfly.yml， 配置主题的 _config.yml 将不会有效果。
>

#### 5. 注意事项

- 不要把主题目录的 _config.yml 删掉

- 以后只需要在 _config.butterfly.yml 进行主题配置就行。
  如果使用了 _config.butterfly.yml， 主题对应的配置文件 _config.yml中的配置，将被主题文件的配置覆盖。

- Hexo会自动合并主题中的 _config.yml 和 _config.butterfly.yml 里的配置，如果存在同名配置，会使用 _config.butterfly.yml 的配置，其优先度较高。

### 6. 详细的主题配置

> 主要参考 [Butterfly 文档(二) 主题页面](https://butterfly.js.org/posts/dc584b87/) 和 [Butterfly 文档(三) 主题配置](https://butterfly.js.org/posts/4aa8abbe/) 进行自定义，本站点在github上开源，可自取。照着这节操作，可以直接打造站点同款效果
>

先看成品效果



#### 1 生成永久链接

使用[hexo-abbrlink](https://github.com/ohroy/hexo-abbrlink)插件

安装依赖

```
npm install hexo-abbrlink --save
```

在_config.yml中配置

```yml
# abbrlink config
abbrlink:
  alg: crc32      # Algorithm used to calc abbrlink. Support crc16(default) and crc32
  rep: hex        # Representation of abbrlink in URLs. Support dec(default) and hex
  drafts: false   # Whether to generate abbrlink for drafts. (false in default)
  force: false    # Enable force mode. In this mode, the plugin will ignore the cache, and calc the abbrlink for every post even it already had an abbrlink. (false in default)
  writeback: true # Whether to write changes to front-matters back to the actual markdown files. (true in default)
```

#### 2 本地搜索

安装本地搜索依赖

```
npm install hexo-generator-search --save
```

#### 3 字数统计

```
npm i --save hexo-wordcount
```

#### 4 页脚美化

页脚运行时间

在项目名\source\js文件夹下，新建runtime.js

```js
var now = new Date();

function createtime() {
    // 当前时间
    now.setTime(now.getTime() + 1000);
    // var start = new Date("10/09/2023 13:14:00"); // 旅行者1号开始计算的时间
    // var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
    // var unit = (dis / 149600000).toFixed(6);  // 天文单位
    var grt = new Date("4/18/2025 15:55:00");	// 网站诞生时间
    var days = (now - grt) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours);
    1 == String(hnum).length && (hnum = "0" + hnum);
    var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes);
    1 == String(mnum).length && (mnum = "0" + mnum);
    var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds);
    1 == String(snum).length && (snum = "0" + snum);
    let currentTimeHtml = "";
    (currentTimeHtml = `<div style="font-size:13px;font-weight:bold">本站已运行 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> </div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}

// 设置重复执行函数，周期1000ms
setInterval(() => {
    createtime();
}, 1000);
```

页脚徽标

在 项目名\themes\butterfly\layout\includes\footer.pug文件后，新增内容

```pug
    #workboard

    p#ghbdages
      a.github-badge(target='_blank' href="https://hexo.io/" style='margin-inline:5px' title="博客框架为Hexo_v7.3.0")
        img(src="https://img.shields.io/badge/Frame-Hexo-blue?style=flat&logo=hexo" alt='博客框架为Hexo_v7.3.0')

      a.github-badge(target='_blank' href="https://butterfly.js.org/" style='margin-inline:5px' title="主题版本Butterfly_v5.3.5")
        img(src="https://img.shields.io/badge/Theme-Butterfly-6513df?style=flat&logo=bitdefender" alt='主题版本Butterfly_v5.3.5')

      a.github-badge(target='_blank' href="https://github.com/" style='margin-inline:5px' title="本网站源码由Github提供存储仓库")
        img(src="https://img.shields.io/badge/Source-Github-d021d6?style=flat&logo=GitHub" alt='本网站源码由Github提供存储仓库')

      a.github-badge(target='_blank' href="http://creativecommons.org/licenses/by-nc-sa/4.0/" style='margin-inline:5px' title="本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可")
        img(src="https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?style=flat&logo=Claris" alt='本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可')
```

#### 5 说说

新建文件，项目名\source\shuoshuo\index.md

```
title: 说说
date: 2025-04-12 5:34:00
type: 'shuoshuo'
```

数据来源：\项目名\source\\_data\shuoshuo.yml

```yml
- date: 2025-04-18 15:55:00
  content: |
    This is a sample content for **Author 1**.
  tags:
    - 随记
```

#### 6 分类

项目名\source\categories\index.md

```
---
title: 分类
date: 2025-04-18 15:55:00
type: 'categories'
---
```

#### 7 标签

同分类，在项目名\source\tags\文件夹下，新建index.md

```
title: 标签
date: 2025-04-18 15:55:00
type: 'tags'
orderby: random
order: 1
```

#### 8 _config.yml

```
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: 不羡仙
subtitle: ''
description: ''
keywords:
author: 夜鹭
language: zh-CN
timezone: 'Asia/Shanghai'

# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: http://example.com
permalink: post/:abbrlink.html # post为自定义前缀
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :year-:month-:day-:title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
syntax_highlighter: highlight.js
highlight:
  line_number: true
  auto_detect: false
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  preprocess: true
  line_number: true
  tab_replace: ''

# Home page setting
# path: Root path for your blogs index page. (default = '')
# per_page: Posts displayed per page. (0 = disable pagination)
# order_by: Posts order. (Order by date descending by default)
index_generator:
  path: ''
  per_page: 10
  order_by: -date

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Metadata elements
## https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
meta_generator: true

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss
## updated_option supports 'mtime', 'date', 'empty'
updated_option: 'mtime'

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Include / Exclude file(s)
## include:/exclude: options only apply to the 'source/' folder
include:
exclude:
ignore:

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: butterfly

# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repository: yupengtao@你的服务器ip:/home/yupengtao/blog.git
  branch: master

# abbrlink config
abbrlink:
  alg: crc32      # Algorithm used to calc abbrlink. Support crc16(default) and crc32
  rep: hex        # Representation of abbrlink in URLs. Support dec(default) and hex
  drafts: false   # Whether to generate abbrlink for drafts. (false in default)
  force: false    # Enable force mode. In this mode, the plugin will ignore the cache, and calc the abbrlink for every post even it already had an abbrlink. (false in default)
  writeback: true # Whether to write changes to front-matters back to the actual markdown files. (true in default)
```

#### 9 _config.butterfly.yml

```
# --------------------------------------
# Hexo Butterfly Theme Configuration
# If you have any questions, please refer to the documentation
# Chinese: https://butterfly.js.org/
# English: https://butterfly.js.org/en/
# --------------------------------------

# --------------------------------------
# Navigation Settings
# --------------------------------------

nav:
  # Navigation bar logo image
  logo:
  display_title: false
  # Whether to fix navigation bar
  fixed: false

menu:
  首页: / || fa-solid fa-house
  文章 || fa-solid fa-book :
    归档: /archives/ || fa-solid fa-inbox
    标签: /tags/ || fa-solid fa-tags
    分类: /categories/ || fa-solid fa-icons
    说说: /shuoshuo/ || fa-solid fa-comment-dots

# --------------------------------------
# Code Blocks Settings
# --------------------------------------

code_blocks:
  # Code block theme: darker / pale night / light / ocean / false
  theme: light
  macStyle: true
  # Code block height limit (unit: px)
  height_limit: 230
  word_wrap: false

  # Toolbar
  copy: true
  language: true
  # true: shrink the code blocks | false: expand the code blocks | none: expand code blocks and hide the button
  shrink: false
  fullpage: false

# Social media links
# Formal:
#   icon: link || the description || color
social:
  fab fa-github: https://github.com/yupengtao1024 || Github || '#24292e'
  fas fa-envelope: mailto:yupengtao1024@gmail.com || Email || '#4a7dbe'

# --------------------------------------
# Image Settings
# --------------------------------------

favicon: /img/favicon.ico

avatar:
  img: /img/avator.jpg
  effect: false

# Disable all banner images
disable_top_img: false

# If the banner of page not setting, it will show the default_top_img
default_top_img: /img/top_img.gif

# The banner image of index page
index_img:

# The banner image of archive page
archive_img:

# Note: tag page, not tags page
tag_img:

# The banner image of tag page, you can set the banner image for each tag
# Format:
#  - tag name: xxxxx
tag_per_img:

# Note: category page, not categories page
category_img:

# The banner image of category page, you can set the banner image for each category
# Format:
#  - category name: xxxxx
category_per_img:

# The background image of footer
footer_img: transparent

# Website Background
# Can set it to color or image url
background:

cover:
  # Disable the cover or not
  index_enable: true
  aside_enable: true
  archives_enable: true
  # When cover is not set, the default cover is displayed
  default_cover:
    # - xxx.jpg
    - /img/default_cover_1.jpg
    - /img/default_cover_2.jpg
    - /img/default_cover_3.jpg
    - /img/default_cover_4.jpg
    - /img/default_cover_5.gif
    - /img/default_cover_6.jpg

# Replace Broken Images
error_img:
  flink: /img/friend_404.gif
  post_page: /img/imgNotFound.gif

# A simple 404 page
error_404:
  enable: true
  subtitle: 'Page Not Found'
  background: /img/error-page.png

post_meta:
  # Home Page
  page:
    # Choose: created / updated / both
    date_type: both
    # Choose: date / relative
    date_format: relative
    categories: true
    tags: false
    label: true
  post:
    # Choose: left / center
    position: left
    # Choose: created / updated / both
    date_type: both
    # Choose: date / relative
    date_format: relative
    categories: true
    tags: true
    label: true

# --------------------------------------
# Index page settings
# --------------------------------------

# The top_img settings of home page
# default: top img - full screen, site info - middle
# The position of site info, eg: 300px/300em/300rem/10%
index_site_info_top:
# The height of top_img, eg: 300px/300em/300rem
index_top_img_height:

# The subtitle on homepage
subtitle:
  enable: true
  # Typewriter Effect
  effect: true
  # Customize typed.js
  # https://github.com/mattboldt/typed.js/#customization
  typed_option:
  # Source - Call the third-party service API (Chinese only)
  # It will show the source first, then show the content of sub
  # Choose: false/1/2/3
  # false - disable the function
  # 1 - hitokoto.cn
  # 2 - https://api.aa1.cn/doc/yiyan.html
  # 3 - jinrishici.com
  source: false
  # If you close the typewriter effect, the subtitle will only show the first line of sub
  sub:
    - 昔人已乘黄鹤去，此地空余黄鹤楼

# Article layout on the homepage
# 1: Cover on the left, info on the right
# 2: Cover on the right, info on the left
# 3: Cover and info alternate between left and right
# 4: Cover on top, info on the bottom
# 5: Info displayed on the cover
# 6: Masonry layout - Cover on top, info on the bottom
# 7: Masonry layout - Info displayed on the cover
index_layout: 3

# Display the article introduction on homepage
# 1: description
# 2: both (if the description exists, it will show description, or show the auto_excerpt)
# 3: auto_excerpt (default)
# false: do not show the article introduction
index_post_content:
  method: 3
  # If you set method to 2 or 3, the length need to config
  length: 500

# --------------------------------------
# Post Settings
# --------------------------------------

toc:
  post: true
  page: false
  number: false
  expand: false
  # Only for post
  style_simple: false
  scroll_percent: true

post_copyright:
  enable: true
  decode: false
  author_href: buxianxian.cn
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/

# Sponsor/reward
reward:
  enable: false
  text:
  QR_code:
  # - img: /img/wechat.jpg
  #   link:
  #   text: wechat
  # - img: /img/alipay.jpg
  #   link:
  #   text: alipay

# Post edit
# Easily browse and edit blog source code online.
post_edit:
  enable: true
  # url: https://github.com/user-name/repo-name/edit/branch-name/subdirectory-name/
  # For example: https://github.com/jerryc127/butterfly.js.org/edit/main/source/
  url: https://github.com/yupengtao1024/buxianxian/edit/master/source/

# Related Articles
related_post:
  enable: true
  # Number of posts displayed
  limit: 6
  # Choose: created / updated
  date_type: created

# Choose: 1 / 2 / false
# 1: The 'next post' will link to old post
# 2: The 'next post' will link to new post
# false: disable pagination
post_pagination: 1

# Displays outdated notice for a post
noticeOutdate:
  enable: false
  # Style: simple / flat
  style: flat
  # When will it be shown
  limit_day: 365
  # Position: top / bottom
  position: top
  message_prev: It has been
  message_next: days since the last update, the content of the article may be outdated.

# --------------------------------------
# Footer Settings
# --------------------------------------
footer:
  owner:
    enable: true
    since: 2025
  custom_text: <a href="https://beian.miit.gov.cn/#/Integrated/index"><img class="icp-icon" src="https://img.shields.io/badge/%E8%9C%80ICP%E5%A4%87-2025136021%E5%8F%B7-e1d492?style=flat&logo=data:image/png;base64,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"></a>
  # Copyright of theme and framework
  copyright: false

# --------------------------------------
# Aside Settings
# --------------------------------------

aside:
  enable: true
  hide: false
  # Show the button to hide the aside in bottom right button
  button: true
  mobile: true
  # Position: left / right
  position: right
  display:
    archive: true
    tag: true
    category: true
  card_author:
    enable: true
    description:
    button:
      enable: true
      icon: fab fa-github
      text: Follow Me
      link: https://github.com/yupengtao1024
  card_announcement:
    enable: true
    content: This is my Blog
  card_recent_post:
    enable: true
    # If set 0 will show all
    limit: 3
    # Sort: date / updated
    sort: date
    sort_order:
  card_newest_comments:
    enable: false
    sort_order:
    limit: 6
    # Unit: mins, save data to localStorage
    storage: 10
    avatar: true
  card_categories:
    enable: false
    # If set 0 will show all
    limit: 8
    # Choose: none / true / false
    expand: none
    sort_order:
  card_tags:
    enable: true
    # If set 0 will show all
    limit: 20
    color: true
    # Order of tags, random/name/length
    orderby: random
    # Sort of order. 1, asc for ascending; -1, desc for descending
    order: 1
    sort_order:
  card_archives:
    enable: false
    # Type: monthly / yearly
    type: monthly
    # Eg: YYYY年MM月
    format: MMMM YYYY
    # Sort of order. 1, asc for ascending; -1, desc for descending
    order: -1
    # If set 0 will show all
    limit: 8
    sort_order:
  card_post_series:
    enable: true
    # The title shows the series name
    series_title: false
    # Order by title or date
    orderBy: 'date'
    # Sort of order. 1, asc for ascending; -1, desc for descending
    order: -1
  card_webinfo:
    enable: true
    post_count: true
    last_push_date: true
    sort_order:
    # Time difference between publish date and now
    # Formal: Month/Day/Year Time or Year/Month/Day Time
    # Leave it empty if you don't enable this feature
    runtime_date: 6/4/2025 18:00:00

# --------------------------------------
# Bottom right button
# --------------------------------------

# The distance between the bottom right button and the bottom (default unit: px)
rightside_bottom:

# Conversion between Traditional and Simplified Chinese
translate:
  enable: true
  # The text of a button
  default: 繁
  # the language of website (1 - Traditional Chinese/ 2 - Simplified Chinese）
  defaultEncoding: 2
  # Time delay
  translateDelay: 0
  # The text of the button when the language is Simplified Chinese
  msgToTraditionalChinese: '繁'
  # The text of the button when the language is Traditional Chinese
  msgToSimplifiedChinese: '簡'

# Read Mode
readmode: true

# Dark Mode
darkmode:
  enable: true
  # Toggle Button to switch dark/light mode
  button: true
  # Switch dark/light mode automatically
  # autoChangeMode: 1  Following System Settings, if the system doesn't support dark mode, it will switch dark mode between 6 pm to 6 am
  # autoChangeMode: 2  Switch dark mode between 6 pm to 6 am
  # autoChangeMode: false
  autoChangeMode: 1
  # Set the light mode time. The value is between 0 and 24. If not set, the default value is 6 and 18
  start:
  end:

# Show scroll percent in scroll-to-top button
rightside_scroll_percent: true

# Don't modify the following settings unless you know how they work
# Choose: readmode,translate,darkmode,hideAside,toc,chat,comment
# Don't repeat the same value
rightside_item_order:
  enable: false
  # Default: readmode,translate,darkmode,hideAside
  hide:
  # Default: toc,chat,comment
  show:

# --------------------------------------
# Global Settings
# --------------------------------------

anchor:
  # When you scroll, the URL will update according to header id.
  auto_update: false
  # Click the headline to scroll and update the anchor
  click_to_scroll: false

photofigcaption: false

copy:
  enable: true
  # Add the copyright information after copied content
  copyright:
    enable: false
    limit_count: 150

# Need to install the hexo-wordcount plugin
wordcount:
  enable: true
  # Display the word count of the article in post meta
  post_wordcount: true
  # Display the time to read the article in post meta
  min2read: true
  # Display the total word count of the website in aside's webinfo
  total_wordcount: true

# Busuanzi count for PV / UV in site
busuanzi:
  site_uv: true
  site_pv: true
  page_pv: true

# --------------------------------------
# Math
# --------------------------------------

# About the per_page
# if you set it to true, it will load mathjax/katex script in each page
# if you set it to false, it will load mathjax/katex script according to your setting (add the 'mathjax: true' or 'katex: true' in page's front-matter)
math:
  # Choose: mathjax, katex
  # Leave it empty if you don't need math
  use:
  per_page: true
  hide_scrollbar: false

  mathjax:
    # Enable the contextual menu
    enableMenu: true
    # Choose: all / ams / none, This controls whether equations are numbered and how
    tags: none

  katex:
    # Enable the copy KaTeX formula
    copy_tex: false

# --------------------------------------
# Search
# --------------------------------------

search:
  # Choose: algolia_search / local_search / docsearch
  # leave it empty if you don't need search
  use: local_search
  placeholder: 站内搜索

  # Algolia Search
  algolia_search:
    # Number of search results per page
    hitsPerPage: 6

  # Local Search
  local_search:
    # Preload the search data when the page loads.
    preload: false
    # Show top n results per article, show all results by setting to -1
    top_n_per_article: 1
    # Unescape html strings to the readable one.
    unescape: false
    CDN:

  # Docsearch
  # https://docsearch.algolia.com/
  docsearch:
    appId:
    apiKey:
    indexName:
    option:

# --------------------------------------
# Share System
# --------------------------------------

share:
  # Choose: sharejs / addtoany
  # Leave it empty if you don't need share
  use: sharejs

  # Share.js
  # https://github.com/overtrue/share.js
  sharejs:
    sites: facebook,twitter,wechat,weibo,qq

  # AddToAny
  # https://www.addtoany.com/
  addtoany:
    item: facebook,twitter,wechat,sina_weibo,facebook_messenger,email,copy_link

# --------------------------------------
# Comments System
# --------------------------------------

comments:
  # Up to two comments system, the first will be shown as default
  # Leave it empty if you don't need comments
  # Choose: Disqus/Disqusjs/Livere/Gitalk/Valine/Waline/Utterances/Facebook Comments/Twikoo/Giscus/Remark42/Artalk
  # Format of two comments system : Disqus,Waline
  use:
  # Display the comment name next to the button
  text: true
  # Lazyload: The comment system will be load when comment element enters the browser's viewport.
  # If you set it to true, the comment count will be invalid
  lazyload: false
  # Display comment count in post's top_img
  count: false
  # Display comment count in Home Page
  card_post_count: false

# Disqus
# https://disqus.com/
disqus:
  shortname:
  # For newest comments widget
  apikey:

# Alternative Disqus - Render comments with Disqus API
# https://github.com/SukkaW/DisqusJS
disqusjs:
  shortname:
  apikey:
  option:

# Livere
# https://www.livere.com/
livere:
  uid:

# Gitalk
# https://github.com/gitalk/gitalk
gitalk:
  client_id:
  client_secret:
  repo:
  owner:
  admin:
  option:

# Valine
# https://valine.js.org
valine:
  appId:
  appKey:
  avatar: monsterid
  # This configuration is suitable for domestic custom domain name users, overseas version will be automatically detected (no need to manually fill in)
  serverURLs:
  bg:
  # Use Valine visitor count as the page view count
  visitor: false
  option:

# Waline - A simple comment system with backend support fork from Valine
# https://waline.js.org/
waline:
  serverURL:
  bg:
  # Use Waline pageview count as the page view count
  pageview: false
  option:

# Utterances
# https://utteranc.es/
utterances:
  repo:
  # Issue Mapping: pathname/url/title/og:title
  issue_term: pathname
  # Theme: github-light/github-dark/github-dark-orange/icy-dark/dark-blue/photon-dark
  light_theme: github-light
  dark_theme: photon-dark
  js:
  option:

# Facebook Comments Plugin
# https://developers.facebook.com/docs/plugins/comments/
facebook_comments:
  app_id:
  # optional
  user_id:
  pageSize: 10
  # Choose: social / time / reverse_time
  order_by: social
  lang: en_US

# Twikoo
# https://github.com/imaegoo/twikoo
twikoo:
  envId:
  region:
  # Use Twikoo visitor count as the page view count
  visitor: false
  option:

# Giscus
# https://giscus.app/
giscus:
  repo:
  repo_id:
  category_id:
  light_theme: light
  dark_theme: dark
  js:
  option:

# Remark42
# https://remark42.com/docs/configuration/frontend/
remark42:
  host:
  siteId:
  option:

# Artalk
# https://artalk.js.org/guide/frontend/config.html
artalk:
  server:
  site:
  # Use Artalk visitor count as the page view count
  visitor: false
  option:

# --------------------------------------
# Chat Services
# --------------------------------------

chat:
  # Choose: chatra/tidio/crisp
  # Leave it empty if you don't need chat
  use:
  # Chat Button [recommend]
  # It will create a button in the bottom right corner of website, and hide the origin button
  rightside_button: false
  # The origin chat button is displayed when scrolling up, and the button is hidden when scrolling down
  button_hide_show: false

# https://chatra.io/
chatra:
  id:

# https://www.tidio.com/
tidio:
  public_key:

# https://crisp.chat/en/
crisp:
  website_id:

# --------------------------------------
# Analysis
# --------------------------------------

# https://tongji.baidu.com/web/welcome/login
baidu_analytics:

# https://analytics.google.com/analytics/web/
google_analytics:

# https://www.cloudflare.com/zh-tw/web-analytics/
cloudflare_analytics:

# https://clarity.microsoft.com/
microsoft_clarity:

# https://umami.is/
umami_analytics:
  enable: false
  # For self-hosted setups, configure the hostname of the Umami instance
  serverURL:
  website_id:
  option:
  UV_PV:
    site_uv: false
    site_pv: false
    page_pv: false
    # Umami Cloud (API key) / self-hosted Umami (token)
    token:

# --------------------------------------
# Advertisement
# --------------------------------------

# Google Adsense
google_adsense:
  enable: false
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client:
  enable_page_level_ads: true

# Insert ads manually
# Leave it empty if you don't need ads
ad:
  # Insert ads in the index (every three posts)
  index:
  # Insert ads in aside
  aside:
  # Insert ads in the post (before pagination)
  post:

# --------------------------------------
# Verification
# --------------------------------------

site_verification:
# - name: google-site-verification
#   content: xxxxxx
# - name: baidu-site-verification
#   content: xxxxxxx

# --------------------------------------
# Beautify / Effect
# --------------------------------------

# Theme color for customize
# Notice: color value must in double quotes like "#000" or may cause error!

# theme_color:
#   enable: true
#   main: "#49B1F5"
#   paginator: "#00c4b6"
#   button_hover: "#FF7242"
#   text_selection: "#00c4b6"
#   link_color: "#99a9bf"
#   meta_color: "#858585"
#   hr_color: "#A4D8FA"
#   code_foreground: "#F47466"
#   code_background: "rgba(27, 31, 35, .05)"
#   toc_color: "#00c4b6"
#   blockquote_padding_color: "#49b1f5"
#   blockquote_background_color: "#49b1f5"
#   scrollbar_color: "#49b1f5"
#   meta_theme_color_light: "ffffff"
#   meta_theme_color_dark: "#0d0d0d"

# The user interface setting of category and tag page
# Choose: index - same as Homepage UI / default - same as archives UI
# leave it empty or index
category_ui:
tag_ui:

# Rounded corners for UI elements
rounded_corners_ui: true

# Stretches the lines so that each line has equal width
text_align_justify: false

# Add a mask to the header and footer
mask:
  header: true
  footer: true

# Loading Animation
preloader:
  enable: true
  # source
  # 1. fullpage-loading
  # 2. pace (progress bar)
  source: 1
  # pace theme (see https://codebyzach.github.io/pace/)
  pace_css_url:

# Page Transition
enter_transitions: true

# Default display mode - light (default) / dark
display_mode: light

# Configuration for beautifying the content of the article
beautify:
  enable: true
  # Specify the field to beautify (site or post)
  field: post
  # Specify the icon to be used as a prefix for the title, such as '\f0c1'
  title_prefix_icon: '\f0c1'
  # Specify the color of the title prefix icon, such as '#F47466'
  title_prefix_icon_color: '#F47466'

# Global font settings
# Don't modify the following settings unless you know how they work
font:
  global_font_size:
  code_font_size:
  font_family:
  code_font_family:

# Font settings for the site title and site subtitle
blog_title_font:
  font_link:
  font_family:

# The setting of divider icon
hr_icon:
  enable: true
  # The unicode value of Font Awesome icon, such as '\3423'
  icon:
  icon_top:

# Typewriter Effect
# https://github.com/disjukr/activate-power-mode
activate_power_mode:
  enable: false
  colorful: true
  shake: true
  mobile: false

# Background effects
# --------------------------------------

# canvas_ribbon
# See: https://github.com/hustcc/ribbon.js
canvas_ribbon:
  enable: false
  # The size of ribbon
  size: 150
  # The opacity of ribbon (0 ~ 1)
  alpha: 0.6
  zIndex: -1
  click_to_change: false
  mobile: false

# Fluttering Ribbon
canvas_fluttering_ribbon:
  enable: false
  mobile: false

# canvas_nest
# https://github.com/hustcc/canvas-nest.js
canvas_nest:
  enable: false
  # Color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
  color: '0,0,255'
  # The opacity of line (0~1)
  opacity: 0.7
  # The z-index property of the background
  zIndex: -1
  # The number of lines
  count: 99
  mobile: false

# Mouse click effects: fireworks
fireworks:
  enable: false
  zIndex: 9999
  mobile: false

# Mouse click effects: Heart symbol
click_heart:
  enable: false
  mobile: false

# Mouse click effects: words
clickShowText:
  enable: false
  text:
  # - I
  # - LOVE
  # - YOU
  fontSize: 15px
  random: false
  mobile: false

# --------------------------------------
# Lightbox Settings
# --------------------------------------

# Choose: fancybox / medium_zoom
# https://github.com/francoischalifour/medium-zoom
# https://fancyapps.com/fancybox/
# Leave it empty if you don't need lightbox
lightbox: medium_zoom

# --------------------------------------
# Tag Plugins settings
# --------------------------------------

# Series
series:
  enable: false
  # Order by title or date
  orderBy: 'title'
  # Sort of order. 1, asc for ascending; -1, desc for descending
  order: 1
  number: true

# ABCJS - The ABC Music Notation Plugin
# https://github.com/paulrosen/abcjs
abcjs:
  enable: false
  per_page: true

# Mermaid
# https://github.com/mermaid-js/mermaid
mermaid:
  enable: false
  # Write Mermaid diagrams using code blocks
  code_write: false
  # built-in themes: default / forest / dark / neutral
  theme:
    light: default
    dark: dark

# chartjs
# see https://www.chartjs.org/docs/latest/
chartjs:
  enable: false
  # Do not modify unless you understand how they work.
  # The default settings are only used when the MD syntax is not specified.
  # General font color for the chart
  fontColor:
    light: 'rgba(0, 0, 0, 0.8)'
    dark: 'rgba(255, 255, 255, 0.8)'
  # General border color for the chart
  borderColor:
    light: 'rgba(0, 0, 0, 0.1)'
    dark: 'rgba(255, 255, 255, 0.2)'
  # Background color for scale labels on radar and polar area charts
  scale_ticks_backdropColor:
    light: 'transparent'
    dark: 'transparent'

# Note - Bootstrap Callout
note:
  # Note tag style values:
  #  - simple    bs-callout old alert style. Default.
  #  - modern    bs-callout new (v2-v3) alert style.
  #  - flat      flat callout style with background, like on Mozilla or StackOverflow.
  #  - disabled  disable all CSS styles import of note tag.
  style: flat
  icons: true
  border_radius: 3
  # Offset lighter of background in % for modern and flat styles (modern: -12 | 12; flat: -18 | 6).
  # Offset also applied to label tag variables. This option can work with disabled note tag.
  light_bg_offset: 0

# --------------------------------------
# Other Settings
# --------------------------------------

# https://github.com/MoOx/pjax
pjax:
  enable: true
  # Exclude the specified pages from pjax, such as '/music/'
  exclude:
  # - /xxxxxx/

# Inject the css and script (aplayer/meting)
aplayerInject:
  enable: false
  per_page: true

# Snackbar - Toast Notification
# https://github.com/polonel/SnackBar
# position: top-left / top-center / top-right / bottom-left / bottom-center / bottom-right
snackbar:
  enable: true
  position: bottom-left
  # The background color of Toast Notification in light mode and dark mode
  bg_light: '#49b1f5'
  bg_dark: '#1f1f1f'

# Instant.page
# https://instant.page/
instantpage: true

# Lazyload
# https://github.com/verlok/vanilla-lazyload
lazyload:
  enable: false
  # Specify the field to use lazyload (site or post)
  field: site
  placeholder:
  blur: false

# PWA
# See https://github.com/JLHwung/hexo-offline
# ---------------
pwa:
  enable: false
  manifest:
  apple_touch_icon:
  favicon_32_32:
  favicon_16_16:
  mask_icon:

# Open graph meta tags
# https://hexo.io/docs/helpers#open-graph
Open_Graph_meta:
  enable: true
  option:
  # twitter_card:
  # twitter_image:
  # twitter_id:
  # twitter_site:
  # google_plus:
  # fb_admins:
  # fb_app_id:

# Structured Data
# https://developers.google.com/search/docs/guides/intro-structured-data
structured_data: true

# Add the vendor prefixes to ensure compatibility
css_prefix: true

# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
inject:
  head:
  # - <link rel="stylesheet" href="/xxx.css">
  bottom:
    # - <script src="xxxx"></script>
    - <script defer src="/js/runtime.js"></script> # 页脚计时器

# CDN Settings
# Don't modify the following settings unless you know how they work
CDN:
  # The CDN provider for internal and third-party scripts
  # Options for both: local/jsdelivr/unpkg/cdnjs/custom
  # Note: Dev version can only use 'local' for internal scripts
  # Note: When setting third-party scripts to 'local', you need to install hexo-butterfly-extjs
  internal_provider: local
  third_party_provider: cdnjs

  # Add version number to url, true or false
  version: false

  # Custom format
  # For example: https://cdn.staticfile.org/${cdnjs_name}/${version}/${min_cdnjs_file}
  custom_format:

  option:
  # abcjs_basic_js:
  # activate_power_mode:
  # algolia_js:
  # algolia_search:
  # aplayer_css:
  # aplayer_js:
  # artalk_css:
  # artalk_js:
  # blueimp_md5:
  # busuanzi:
  # canvas_fluttering_ribbon:
  # canvas_nest:
  # canvas_ribbon:
  # chartjs:
  # click_heart:
  # clickShowText:
  # disqusjs:
  # disqusjs_css:
  # docsearch_css:
  # docsearch_js:
  # egjs_infinitegrid:
  # fancybox:
  # fancybox_css:
  # fireworks:
  # fontawesome:
  # gitalk:
  # gitalk_css:
  # giscus:
  # instantpage:
  # instantsearch:
  # katex:
  # katex_copytex:
  # lazyload:
  # local_search:
  # main:
  # main_css:
  # mathjax:
  # medium_zoom:
  # mermaid:
  # meting_js:
  # prismjs_autoloader:
  # prismjs_js:
  # prismjs_lineNumber_js:
  # pjax:
  # sharejs:
  # sharejs_css:
  # snackbar:
  # snackbar_css:
  # translate:
  # twikoo:
  # typed:
  # utils:
  # valine:
  # waline_css:
  # waline_js:
```

