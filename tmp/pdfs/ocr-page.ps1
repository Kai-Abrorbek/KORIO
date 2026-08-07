param(
  [Parameter(Mandatory = $true)]
  [string]$ImagePath
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime

function Wait-WinRtResult {
  param(
    [Parameter(Mandatory = $true)]
    [object]$AsyncOperation,
    [Parameter(Mandatory = $true)]
    [type]$ResultType
  )

  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object {
      $_.Name -eq 'AsTask' -and
      $_.IsGenericMethod -and
      $_.GetParameters().Count -eq 1
    } |
    Select-Object -First 1
  $task = $method.MakeGenericMethod($ResultType).Invoke($null, @($AsyncOperation))
  $task.Wait()
  return $task.Result
}

[void][Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]
[void][Windows.Storage.Streams.IRandomAccessStream,Windows.Storage.Streams,ContentType=WindowsRuntime]
[void][Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]
[void][Windows.Graphics.Imaging.SoftwareBitmap,Windows.Graphics.Imaging,ContentType=WindowsRuntime]
[void][Windows.Media.Ocr.OcrEngine,Windows.Media.Ocr,ContentType=WindowsRuntime]
[void][Windows.Media.Ocr.OcrResult,Windows.Media.Ocr,ContentType=WindowsRuntime]
[void][Windows.Globalization.Language,Windows.Globalization,ContentType=WindowsRuntime]

$resolvedPath = (Resolve-Path -LiteralPath $ImagePath).Path
$file = Wait-WinRtResult (
  [Windows.Storage.StorageFile]::GetFileFromPathAsync($resolvedPath)
) ([Windows.Storage.StorageFile])
$stream = Wait-WinRtResult (
  $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
) ([Windows.Storage.Streams.IRandomAccessStream])
$decoder = Wait-WinRtResult (
  [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
) ([Windows.Graphics.Imaging.BitmapDecoder])
$bitmap = Wait-WinRtResult (
  $decoder.GetSoftwareBitmapAsync()
) ([Windows.Graphics.Imaging.SoftwareBitmap])
$language = [Windows.Globalization.Language]::new('ko')
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($language)
$result = Wait-WinRtResult (
  $engine.RecognizeAsync($bitmap)
) ([Windows.Media.Ocr.OcrResult])

$result.Text

