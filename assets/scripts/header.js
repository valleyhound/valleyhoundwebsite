var headerCode = `
    <script src="/assets/scripts/basicheader.js"></script>
    <img src="/assets/images/extended_header.png" style="margin-top:2%;margin-bottom:-25%" class="prevent_select" id="headerImage">
    <script>document.getElementById('headerImage').ondragstart = function() { return false; };</script>
    <br>
    <br>
    <br>
`;

document.write(headerCode);