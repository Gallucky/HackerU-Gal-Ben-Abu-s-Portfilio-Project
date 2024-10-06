function CalculatePercentage {
    param (
        [Parameter(Mandatory = $true, HelpMessage = "The 100% in pixels.")]
        [int] $Whole,
        [Parameter(Mandatory = $true, HelpMessage = "The amount of pixels to check it's percentage.")]
        [int] $CountCheck
    )

    return ($CountCheck / $Whole) * 100
}

$running = $true
while ($running) {

    do {
        Write-Host -NoNewline -ForegroundColor Cyan "Enter the maximum - 100%: "
        $wholeInput = Read-Host
    } while ($wholeInput -eq $null)

    do {
        Write-Host -NoNewline -ForegroundColor Yellow "Enter the amount of pixels to check the percentage: "
        $amountToCheckInput = Read-Host
    } while ($wholeInput -eq $null)

    $result = CalculatePercentage -Whole $wholeInput -CountCheck $amountToCheckInput

    Write-Host -ForegroundColor Magenta "Result: $result%"

    $answerInvalid = $true
    while ($answerInvalid) {
        Write-Host -NoNewline -ForegroundColor Gray "Continue Calculating? -> (y/n): "
        $answer = Read-Host
        
        if ($null -eq $answer) {
            Write-Host -ForegroundColor Red "Answer cannot be null."
        }
        elseif ($answer.Length -ne 1) {
            Write-Host -ForegroundColor Red "Answer has to be one character."
        }
        else {
            $answerInvalid = $false
        }
    }

    $running = $answer -ne 'n'
}

Write-Host "Goodbye!"