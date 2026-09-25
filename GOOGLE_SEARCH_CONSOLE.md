# Google Search Console

The site exposes its XML sitemap at:

`https://www.ziamuhammad.com/sitemap.xml`

It is also declared in `https://www.ziamuhammad.com/robots.txt`. The sitemap is generated at build time from the JSON post manifest and includes only articles whose Qatar publication date has arrived.

## Verify the site

1. In [Google Search Console](https://search.google.com/search-console), add the `https://www.ziamuhammad.com/` URL-prefix property.
2. Choose **HTML tag** verification and copy only the value in the tag's `content` attribute.
3. Add it locally to `.env`:

   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=the_token_from_google
   ```

4. Deploy the site, then click **Verify** in Search Console. Keep the variable configured so ownership remains verified.

For a Domain property, verify the DNS TXT record with the domain provider instead; no application change is required.

## Submit the sitemap

After verification and deployment, open **Sitemaps** in Search Console and submit:

`https://www.ziamuhammad.com/sitemap.xml`

Use **URL Inspection** for an important newly published page if you want to request crawling. Google treats sitemap submission as a discovery signal, so indexing is not immediate or guaranteed.
