<#
.SYNOPSIS
Calculates element's height / width ratio with it's parent element.    
.NOTES
Function assumes the values are the same unit type.
.EXAMPLE
CalculateRatio -ElementHeight 642.8 -ParentHeight 1080
Expected Result ≈ 59.52

Calculation Process:
(642.8 / 1080) * 100 ≈ 59.52%
#>
function CalculateRatio {
    param (
        [Parameter(Mandatory = $true, HelpMessage = "The element height value")]
        [string] $ElementHeight,

        [Parameter(Mandatory = $true, HelpMessage = "The element's parent height value")]
        [string] $ParentHeight
    )

    # Calculating the ratio in a precentage.
    $percentage = ($ElementHeight / $ParentHeight) * 100

    return $percentage
}

$exitFlag = $false

do {
    Write-Host -NoNewline -ForegroundColor Blue "Enter the element's width / height value: "
    $element = Read-Host

    Write-Host -NoNewline -ForegroundColor Cyan "Enter the element's parent width / height value: "
    $parent = Read-Host

    $result = CalculateRatio -ElementHeight $element -ParentHeight $parent
    Write-Host -ForegroundColor Green "Result: $result%"

    Write-Host -NoNewline -ForegroundColor Magenta "Do you want to continue? (y/n): "
    $answer = Read-Host

    if ($answer -eq 'N' -or $answer -eq 'n') {
        $exitFlag = $true
    }
    else {
        Write-Host
    }

} while (-not $exitFlag)