export const menuDataSource = {
  "sections": [
    {
      "name": "Templates",
      "layout": {
        "itemsPerRow": 2,
        "searchEnabled": true,
        "accessType": "free"
      },
      "items": [
        {
          "icon": "mdi:file-document-outline",
          "name": "Cover Page",
          "type": "cover",
          "content": "<div style=\"display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; width: 100%; background: linear-gradient(to right, #0077be, #7b2cbf); color: white; padding: 40px; box-sizing: border-box;\"><div style=\"border: 4px solid white; padding: 40px; border-radius: 10px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;\"><h1 style=\"font-size: 3em; font-weight: bold; text-align: center;\">Your Book Title</h1><h2 style=\"font-size: 2em; text-align: center;\">By Author Name</h2></div></div>",
          "imageUrl": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2730&q=80",
          "planType": "Free",
          "tags": ["Template", "Cover", "Free"],
          "modificationOptions": [
            "alignment",
            "lineHeight",
            "opacity",
            "backgroundColor",
            "fontColor",
            "border"
          ],
          "canvasAction": "replace"
        },
        {
          "icon": "mdi:book-open-outline",
          "name": "Table of Contents",
          "type": "toc",
          "content": "<div style=\"padding: 40px; box-sizing: border-box; height: 100vh;\"><h1 style=\"font-size: 2.5em; font-weight: bold; margin-bottom: 20px;\">Table of Contents</h1><ul style=\"list-style-type: none; padding: 0;\"><li style=\"display: flex; justify-content: space-between; margin-bottom: 10px;\"><span>Chapter 1: Introduction</span><span>1</span></li><li style=\"display: flex; justify-content: space-between; margin-bottom: 10px;\"><span>Chapter 2: Main Content</span><span>15</span></li><li style=\"display: flex; justify-content: space-between; margin-bottom: 10px;\"><span>Chapter 3: Conclusion</span><span>30</span></li></ul></div>",
          "imageUrl": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          "planType": "Business",
          "tags": ["Template", "TOC", "Premium"],
          "modificationOptions": [
            "backgroundColor",
            "fontColor",
            "border"
          ],
          "canvasAction": "replace"
        },
        {
          "icon": "mdi:book-open-outline",
          "name": "Modern Fiction",
          "type": "toc",
          "content": "<div style='font-family: Arial, sans-serif; line-height: 1.5;'><h1 style='color: #444; border-bottom: 1px solid #ccc;'>Modern Fiction Template</h1><p>Start your contemporary narrative...</p></div>"
    ,
    "imageUrl": "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          "planType": "Business",
          "tags": ["Template", "TOC", "Premium"],
          "modificationOptions": [
            "backgroundColor",
            "fontColor",
            "border"
          ],
          "canvasAction": "replace"
        }
      ]
    },
    {
      "name": "Elements",
      "layout": {
        "itemsPerRow": 3,
        "searchEnabled": true,
        "accessType": "premium"
      },
      "items": [
        {
          "icon": "mdi:page-next-outline",
          "name": "Page Break",
          "type": "basic",
          "content": "<div class=\"page-break\"></div>",
          "planType": "Free",
          "tags": ["Page", "Break", "Free"],
          "modificationOptions": [
            "alignment",
            "lineHeight",
            "opacity"
          ],
          "canvasAction": "append"
        },
        {
          "icon": "mdi:table-large",
          "name": "Table",
          "type": "basic",
          "content": "<table style=\"width: 100%; border-collapse: collapse;\"><tr><th>Heading 1</th><th>Heading 2</th><th>Heading 3</th></tr><tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr></table>",
          "planType": "Free",
          "tags": ["Table", "Data", "Free"],
          "modificationOptions": [
            "alignment",
            "border",
            "backgroundColor"
          ],
          "canvasAction": "append"
        },
        {
          "icon": "mdi:youtube",
          "name": "Embed Video",
          "type": "interactive",
          "content": "<div class=\"embed-video\"><iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\"></iframe></div>",
          "planType": "Premium",
          "tags": ["Video", "Embed", "Premium"],
          "modificationOptions": [
            "alignment",
            "border",
            "opacity"
          ],
          "canvasAction": "append"
        }
      ]
    },
    {
      "name": "Text",
      "layout": {
        "itemsPerRow": 2,
        "searchEnabled": true,
        "accessType": "free"
      },
      "items": [
        {
          "icon": "mdi:format-header-1",
          "name": "Heading 1",
          "type": "heading",
          "content": "<h1>Heading Level 1</h1>",
          "planType": "Free",
          "tags": ["Heading", "H1", "Text", "Free"],
          "modificationOptions": [
            "alignment",
            "lineHeight",
            "fontColor"
          ],
          "canvasAction": "append"
        },
        {
          "icon": "mdi:format-list-numbered",
          "name": "Ordered List",
          "type": "text",
          "content": "<ol><li>First item</li><li>Second item</li><li>Third item</li></ol>",
          "planType": "Free",
          "tags": ["List", "Ordered", "Text", "Free"],
          "modificationOptions": [
            "alignment",
            "lineHeight",
            "fontColor"
          ],
          "canvasAction": "append"
        },
        {
          "icon": "mdi:format-list-bulleted",
          "name": "Definition List",
          "type": "text",
          "content": "<dl><dt>HTML</dt><dd>A markup language for creating web pages.</dd><dt>CSS</dt><dd>A style sheet language used for describing the look of a document.</dd></dl>",
          "planType": "Free",
          "tags": ["List", "Definition", "Text", "Free"],
          "modificationOptions": [
            "alignment",
            "lineHeight",
            "fontColor"
          ],
          "canvasAction": "append"
        }
      ]
    },
    {
      "name": "Shapes and Line",
      "layout": {
        "itemsPerRow": 4,
        "searchEnabled": true,
        "accessType": "free"
      },
      "items": [
        {
          "icon": "mdi:square-outline",
          "name": "Rectangle",
          "type": "shape",
          "content": "<div class=\"rectangle\" style=\"width:100px;height:50px;background-color:#000\"></div>",
          "planType": "Free",
          "tags": ["Shape", "Rectangle", "Free"],
          "modificationOptions": [
            "backgroundColor",
            "border",
            "opacity"
          ],
          "canvasAction": "append"
        },
        {
          "icon": "mdi:arrow-right-bold-outline",
          "name": "Line - Arrow",
          "type": "line",
          "content": "<div class=\"arrow\" style=\"border: solid black; border-width: 0 3px 3px 0; display: inline-block; padding: 10px; transform: rotate(-45deg); -webkit-transform: rotate(-45deg);\"></div>",
          "planType": "Free",
          "tags": ["Line", "Arrow", "Free"],
          "modificationOptions": [
            "backgroundColor",
            "border",
            "opacity"
          ],
          "canvasAction": "append"
        }
      ]
    },
    {
      "name": "Images",
      "layout": {
        "itemsPerRow": 2,
        "searchEnabled": true,
        "renderType": "ReactComponent",
        "componentName": "ImageComponent"
      },
      "items": []
    }
  ]
};


 /*   {
      "name": "Icons",
      "layout": {
        "itemsPerRow": 5,
        "searchEnabled": true,
        "renderType": "ReactComponent",
        "componentName": "IconComponent"
      },
      "items": []
    },*/
