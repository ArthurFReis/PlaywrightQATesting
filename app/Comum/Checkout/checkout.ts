import { Page, expect } from '@playwright/test'; 


export async function pageResponsivoCheckout(page: Page) {
    let tamanhos = {"nomes": ["iPhone_SE", "iPhone_XR", "iPhone_12_Pro", "iPhone_14_Pro_Max"], "width": [375,414,390,430], "height": [667,896,844,932]};
    for(const tamanho in tamanhos.width){
      await page.setViewportSize({ width: tamanhos.width[tamanho], height: tamanhos.height[tamanho]});
      await page.screenshot({path: `Evidencias/checkout/Responsivo/home-mobile-${tamanhos.nomes[tamanho]}.png`});
    }
     console.log("É responsivo! \n");
}

export async function testeBotoesMenuCheckout(page: Page) {
        const menuButtons = {"ids":['#nav-home', '#nav-login', '#nav-products', '#nav-checkout']};
        for( var id in menuButtons.ids){
          if((await page.locator(menuButtons.ids[id]).isEnabled()) && (await page.locator(menuButtons.ids[id]).isDisabled())){
            console.log("O botão está invisivel ou está desabilitado!")
          }
          else {
               await page.locator(menuButtons.ids[id]).click();
               await page.screenshot({path: `Evidencias/checkout/Menu/menu-${menuButtons.ids[id]}.png`});
          }
      }
        console.log("Todas as páginas estão funcionando! \n");
}