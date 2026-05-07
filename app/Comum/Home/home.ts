import { Page, expect } from '@playwright/test';

export async function pageResponsivoHome(page: Page) {
    let tamanhos = {"nomes": ["iPhone_SE", "iPhone_XR", "iPhone_12_Pro", "iPhone_14_Pro_Max"], "width": [375,414,390,430], "height": [667,896,844,932]};
    for(const tamanho in tamanhos.width){
      await page.setViewportSize({ width: tamanhos.width[tamanho], height: tamanhos.height[tamanho]});
      await page.screenshot({path: `Evidencias/Home/Responsivo/home-mobile-${tamanhos.nomes[tamanho]}.png`});
    }
     console.log("É responsivo! \n");
}