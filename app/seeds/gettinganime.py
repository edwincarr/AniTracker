import requests


def write():
    lines = []
    names = []
    for x in range(0, 2000, 10):
        response = requests.get(
            f'https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]={x}&sort=popularityRank')
        real = response.json()['data']
        for x in real:
            if(x['attributes']['slug'] and x['attributes']['posterImage'] and x['attributes']['episodeCount'] and x['attributes']['description']):
                lines.append(f"{x['attributes']['slug'].replace('-','_')}= Anime(name='{x['attributes']['slug'].replace('-',' ')}', cover='{x['attributes']['posterImage']['large']}', episodes={x['attributes']['episodeCount']}, bio='''{x['attributes']['description']}''')")
                names.append(x['attributes']['slug'].replace('-','_'))
        with open('anime.py', 'w') as f:
            for line in lines:
                f.write(line)
                f.write('\n')
            f.close()


write()
