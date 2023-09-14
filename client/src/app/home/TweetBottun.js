"use client"
import { Button } from "@mui/material";
export default function TweetButton ({text,url,hashtags}){

      const _url = new URL("https://twitter.com/intent/tweet");
      if (text !== undefined) _url.searchParams.set("text", text);
      if (url !== undefined) _url.searchParams.set("url", url);
      if (hashtags !== undefined) _url.searchParams.set("hashtags", hashtags);
  
      return (
        <a
          href={_url.toString()}
          target="_blank"
          rel="noopener noreferrer"
        >
            <Button>tweet</Button>
        </a>
      );
    }
