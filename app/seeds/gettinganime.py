import requests


def write():
    lines = []
    for x in range(0, 500, 10):
        response = requests.get(
            f'https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]={x}&sort=ratingRank')
        real = response.json()['data']
        for x in real:
            if(x['attributes']['slug'] and x['attributes']['coverImage'] and x['attributes']['coverImage']['large'] and x['attributes']['episodeCount'] and x['attributes']['description']):
                lines.append(f"{x['attributes']['slug']} = Anime(id = {x['id']}, name = '{x['attributes']['slug']}', picture= '{x['attributes']['coverImage']['large']}' episides = {x['attributes']['episodeCount']}, bio = '''{x['attributes']['description']}''')")
        with open('anime.txt', 'w') as f:
            for line in lines:
                f.write(line)
                f.write('\n')
            f.close()


write()
