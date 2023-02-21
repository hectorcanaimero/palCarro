import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async create(key: string, value: any): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value)});
  };

  async find(key: string): Promise<any>{
    const { value }: any = await Preferences.get({ key });
    return JSON.parse(value);
  };

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  };

  async delete(): Promise<void> {
    await Preferences.clear();
  };

}
