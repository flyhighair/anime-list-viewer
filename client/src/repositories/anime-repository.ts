import { AnimeInfo, AnimeInfoList } from '../models/anime-info-list';
import axios from 'axios';

export default class AnimeRepository {
  private animeList: AnimeInfoList | undefined;

  constructor() {
    this.animeList = undefined;
  }

  get list() {
    if (!this.animeList) {
      return [];
    }

    return this.animeList.all;
  }

  async saveList(year: string, cour: string) {
    const list = await this.fetchAnimeList(year, cour);
    this.animeList = new AnimeInfoList(list);
  }

  private async fetchAnimeList(year: string, cour: string): Promise<AnimeInfo[]> {
    return axios
        .get(`http://localhost:3000/api/anime_lists/${year}/${cour}`)
        .then(res => {
          return res.data;
        })
        .catch((e: string) => {
          throw new Error(e);
        });
  }
}