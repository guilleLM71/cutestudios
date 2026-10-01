$images = @{
    "perla.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Perla-Mockup-Lading.png"
    "marmol.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Marmol-Mockup-Lading.png"
    "terra.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Terra-Mockup-Lading.png"
    "sobre.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Sobre-Mockup-Lading.png"
    "carmesi.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Carmesi-Mockup-Lading.png"
    "gerbera.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Gerbera-Mockup-Lading.png"
    "rosapastel.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Rosa-Pastel-Mockup-Landing-XV-1.png"
    "realeza.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Realeza-Mockup-Landing-XV.png"
    "cinderella.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Cinderella-Mockup-Landing-XV-1.png"
    "fantasy.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Alice-Fantasy-Mockup-Landing-XV.png"
    "royalflush.png" = "https://vogastudios.com/wp-content/uploads/2026/03/Royal-Flush-Mockup-Landing-XV.png"
    "bautizo.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Dorado-Mockup-Landing-Bautizo.png"
    "nudarose.png" = "https://vogastudios.com/wp-content/uploads/2026/01/NudaRose-Mockup-Landing-Cumple.png"
    "festum.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Festum-Mockup-Landing-Cumple.png"
    "marine.png" = "https://vogastudios.com/wp-content/uploads/2026/01/Marine-Mockup-Landing-Graduacion.png"
}

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

foreach ($key in $images.Keys) {
    $url = $images[$key]
    $dest = "c:\Users\jguil\Desktop\proyectos\cutestudios\src\assets\images\$key"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -Headers $headers -ErrorAction Stop
        Write-Host "Downloaded: $key"
    } catch {
        Write-Host "Failed: $key - $($_.Exception.Message)"
    }
}
