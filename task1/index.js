const reverseUserInput = userInput => userInput.split('').reverse().join('');

process.stdin.on('data', data => {
    process.stdout.write(reverseUserInput(data.toString().trim()));
    process.stdout.write('\n\n');
});
