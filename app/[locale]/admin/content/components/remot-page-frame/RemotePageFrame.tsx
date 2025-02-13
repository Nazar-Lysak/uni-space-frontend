'use client'

import { useEffect, useState } from 'react';

const RemotePageFrame: React.FC = () => {

    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://www.purina.co.uk/articles/cats/kitten/behaviour/how-often-to-change-cat-litter");
                const html = await response.text();
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                
                const styleLinks = doc.querySelectorAll("link[rel='stylesheet']");
                styleLinks.forEach((link) => {
                    if (link instanceof HTMLLinkElement && link.href) {
                        const href = link.href.replace(window.location.origin, 'https://www.purina.co.uk');
                        const newLink = document.createElement("link");
                        newLink.rel = "stylesheet";
                        newLink.href = href;
                        document.head.appendChild(newLink);
                    }
                });

                const scripts = doc.querySelectorAll("script[src]");
                scripts.forEach((script) => {
                    if (script instanceof HTMLScriptElement && script.src) {
                        const src = script.src.replace(window.location.origin, 'https://www.purina.co.uk');
                        const newScript = document.createElement("script");
                        newScript.src = src;
                        newScript.async = script.async;
                        newScript.defer = script.defer;
                        document.body.appendChild(newScript);
                    }
                });

                doc.querySelectorAll("img").forEach(img => {
                    if (img.src && !img.src.startsWith("data:")) {
                        img.src = img.src.replace(window.location.origin, 'https://www.purina.co.uk');
                    }
                });

                doc.querySelectorAll("img, source").forEach((img) => {
                    if (img instanceof HTMLImageElement) {
                        if (img.src) {
                            img.src = new URL(img.src, 'https://www.purina.co.uk').href;
                        }
                    } else if (img instanceof HTMLSourceElement) {
                        if (img.srcset) {
                            img.srcset = img.srcset
                                .split(',')
                                .map((src) => {
                                    const [url, descriptor] = src.trim().split(' ');
                                    return `${new URL(url, 'https://www.purina.co.uk').href} ${descriptor || ''}`.trim();
                                })
                                .join(', ');
                        }
                    }
                });
              
              setContent(doc.documentElement.outerHTML);
            } catch (err) {
              console.error("Error:", err);
            }
        };
        
        fetchData();

    }, [])

    console.log(content)

  return (
    <>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}

export default RemotePageFrame;