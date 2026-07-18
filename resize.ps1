Add-Type -AssemblyName System.Drawing
$images = @("watermelon.jpg", "mango.jpg", "rice.jpg", "coffee.jpg")
$path = "c:\Users\datpu\Desktop\Code\ESG-Website\public\images\"

foreach ($img in $images) {
    $fullPath = Join-Path $path $img
    if (Test-Path $fullPath) {
        $bmp = [System.Drawing.Image]::FromFile($fullPath)
        $ratio = $bmp.Width / $bmp.Height
        $newWidth = 600
        $newHeight = [math]::Round($newWidth / $ratio)
        $newBmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($newBmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($bmp, 0, 0, $newWidth, $newHeight)
        $graph.Dispose()
        $bmp.Dispose()
        
        $tempPath = $fullPath.Replace(".jpg", "_small.jpg")
        $newBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $newBmp.Dispose()
        
        Remove-Item $fullPath -Force
        Rename-Item $tempPath $img
        Write-Host "Resized $img"
    }
}
