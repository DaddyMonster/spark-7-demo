import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TranslateDto } from './dto';
import { Translation } from './model/translation';

@Injectable()
export class ServiceLibTranslatorService {
  async translate({ targetLang, text }: TranslateDto): Promise<Translation[]> {
    const KEY = process.env.AZURE_COGNITIVE_KEY;
    const path = process.env.TRANSLATE_A_PATH;
    const payload = text.map((x) => {
      return { Text: x };
    });
    const params = {
      to: targetLang,
    };
    const headers = {
      'Ocp-Apim-Subscription-Key': KEY,
      'Ocp-Apim-Subscription-Region': 'koreacentral',
    };

    const { data } = await axios.post(path, payload, {
      params,
      headers,
    });
    return data;
  }
}
