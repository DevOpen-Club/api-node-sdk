import { createAxios } from '../src/axios';

describe('请求非 JSON 数据', () => {
  it('XML 数据', async () => {
    const axios = createAxios();
    const res = await axios.get('https://httpbin.org/robots.txt');
    expect(res.data).toBe('User-agent: *\nDisallow: /deny\n');
  });
});

describe('请求 JSON 数据', () => {
  it('普通数据', async () => {
    const axios = createAxios();
    const res = await axios.get('https://httpbin.org/json');
    const expected = JSON.parse('{"slideshow":{"author":"Yours Truly","date":"date of publication","slides":[{"title":"Wake up to WonderWidgets!","type":"all"},{"items":["Why <em>WonderWidgets</em> are great","Who <em>buys</em> WonderWidgets"],"title":"Overview","type":"all"}],"title":"Sample Slide Show"}}');
    expect(res.data).toMatchObject(expected);
  });

  it('带 bigint', async () => {
    const axios = createAxios();
    const obj = { id: 9223372036854775808n };
    const res = await axios.post('https://httpbin.org/anything', obj);
    expect(res.data.json).toMatchObject(obj);
  });
});
