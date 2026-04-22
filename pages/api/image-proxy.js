export default async function handler(req,res){
  const {url}=req.query;
  if(!url)return res.status(400).json({error:'No URL'});
  try{
    const r=await fetch(decodeURIComponent(url),{headers:{'User-Agent':'Mozilla/5.0',Referer:'https://www.instagram.com/'}});
    if(!r.ok)return res.status(r.status).end();
    const ct=r.headers.get('content-type')||'image/jpeg';
    const buf=await r.arrayBuffer();
    res.setHeader('Content-Type',ct);
    res.setHeader('Cache-Control','public, max-age=3600');
    return res.status(200).send(Buffer.from(buf));
  }catch(e){return res.status(500).json({error:e.message});}
}