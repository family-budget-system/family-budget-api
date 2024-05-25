import { Injectable } from '@nestjs/common';
import { IconService } from '../../icon/icon.service';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class IconsLoader {
  constructor(private readonly iconService: IconService) {}

  async loadIcons() {
    const iconsDir = path.join(process.cwd(), 'public', 'icons');
    const iconFiles = fs
      .readdirSync(iconsDir)
      .filter((file) => path.extname(file) === '.svg');

    const icons = iconFiles.map((file) => {
      const svgContent = fs.readFileSync(path.join(iconsDir, file), 'utf8');
      return {
        name: path.basename(file, '.svg'),
        svgContent,
      };
    });

    for (const icon of icons) {
      try {
        await this.iconService.create(icon);
      } catch (e) {}
    }
  }

  async init() {
    await this.loadIcons();
  }
}
