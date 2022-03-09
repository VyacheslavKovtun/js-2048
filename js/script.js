(function()
{
    const COL = 4;
    const ROW = 4;
    let nums = [[],[],[],[]];

    let score = 0;
    let scoreField = document.querySelector('.current-score');

    function firstArrayFill()
    {
        for(let i = 0; i < COL; i++)
        {
            for(let j = 0; j < ROW; j++)
            {
                nums[i][j] = '';
            }
        }
    }

    //random nums appearing (filling an array)
    function fillingArray()
    {
        let pos = randomPos();

        if(nums[pos[0]][pos[1]] != '')
        {
            try
            {
                fillingArray();
            }
            catch(RangeError)
            {
                loseGame();
            }
        }
        else {
            if(randomNum(0,100) < 85)
            {
                nums[pos[0]][pos[1]] = '2';
            }
            else {
                nums[pos[0]][pos[1]] = '4';
            }
        }
        updateField();
    }    

    function randomPos()
    {
        let pos = [];
        let max = 3;
        let min = 0;
        pos.push(randomNum(min, max));
        pos.push(randomNum(min, max));
        return pos;
    }

    function randomNum(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //updating the field and a score
    function updateField()
    {
        let numsField = document.querySelector('.nums-array');
        numsField.innerHTML = '';
        for(let i = 0; i < COL; i++)
        {
            let tr = document.createElement('tr');
            tr.id = i;
            for(let j = 0; j < ROW; j++)
            {
               let td = document.createElement('td');
               td.id = toString(i) + toString(j);
               if(nums[i][j] != null)
                {
                    td.innerText = nums[i][j];
                    if(nums[i][j] == 2048)
                    {
                        winGame();
                    }
                    colorNumsFields(td);
                }
               tr.appendChild(td);
            }
            numsField.appendChild(tr);
        }

        scoreField.innerText = score;
    } 

    function colorNumsFields(td)
    {
        switch(td.innerText)
        {
            case '2':
                td.style.backgroundColor = 'gray';
            break;
            case '4':
                td.style.backgroundColor = 'yellow';
            break;
            case '8':
                td.style.backgroundColor = 'brown';
            break;
            case '16':
                td.style.backgroundColor = 'peru';
            break;
            case '32':
                td.style.backgroundColor = 'orange';
            break;
            case '64':
                td.style.backgroundColor = 'red';
            break;
            case '128':
                td.style.backgroundColor = 'lemonchiffon';
            break;
            case '256':
                td.style.backgroundColor = 'orangered';
            break;
            case '512':
                td.style.backgroundColor = 'salmon';
            break;
            case '1024':
                td.style.backgroundColor = 'plum';
            break;
            case '2048':
                td.style.backgroundColor = 'purple';
            break;
        }
    }
    
    //movement
    document.onkeydown = function(e) 
    {
        switch(e.which) 
        {
            case 37:
                moveLeft();
            break;
    
            case 38:
                moveUp();
            break;
    
            case 39:
                moveRight();
            break;
    
            case 40:
                moveDown();
            break;
    
            default: return;
        }
        fillingArray();
        e.preventDefault();
    };

    function moveLeft()
    {
        for (let row = 0; row < ROW; row++)
        {
            let pivot = 0, col = 1;
        
            while (col < COL)
            {
                if (nums[row][col] == 0)
                {
                    col++;
                }
                else if (nums[row][pivot] == 0)
                {
                    nums[row][pivot] = nums[row][col];
                    nums[row][col++] = '';
                }
                else if (nums[row][pivot] == nums[row][col])
                {
                    nums[row][pivot] = parseInt(nums[row][col]) * 2;
                    score += parseInt(nums[row][col]);
                    nums[row][col++] = '';
                }
                else if (++pivot == col)
                {
                    col++;
                }
            }
        }
    }

    function moveUp()
    {
        for (let col = 0; col < COL; col++)
        {
            let pivot = 0, row = 1;
        
            while (row < ROW)
            {
                if (nums[row][col] == 0)
                {
                    row++;
                }
                else if (nums[pivot][col] == 0)
                {
                    nums[pivot][col] = nums[row][col];
                    nums[row++][col] = '';
                }
                else if (nums[pivot][col] == nums[row][col])
                {
                    nums[pivot++][col] = parseInt(nums[row][col]) * 2;
                    score += parseInt(nums[row][col]);
                    nums[row++][col] = '';
                }
                else if (++pivot == row)
                {
                    row++;
                }
            }
        }
    }

    function moveRight()
    {
        for (let row = 0; row < ROW; row++)
        {
            let pivot = 3, col = 2;
        
            while (col >= 0)
            {
                if (nums[row][col] == 0)
                {
                    col--;
                }
                else if (nums[row][pivot] == 0)
                {
                    nums[row][pivot] = nums[row][col];
                    nums[row][col--] = '';
                }
                else if (nums[row][pivot] == nums[row][col])
                {
                    nums[row][pivot] = parseInt(nums[row][col]) * 2;
                    score += parseInt(nums[row][col]);
                    nums[row][col--] = '';
                }
                else if (--pivot == col)
                {
                    col--;
                }
            }
        }
    }

    function moveDown()
    {
        for (let col = 0; col < COL; col++) 
        {
            let pivot = 3, row = 2;

            while (row >= 0) 
            {
                if (nums[row][col] == 0)
                {
                    row--;
                }
                else if (nums[pivot][col] == 0) 
                {
                    nums[pivot][col] = nums[row][col];
                    nums[row--][col] = '';
                }
                else if (nums[pivot][col] == nums[row][col]) 
                {
                    nums[pivot--][col] = parseInt(nums[row][col]) * 2;
                    score += parseInt(nums[row][col]);
                    nums[row--][col] = '';
                }
                else if (--pivot == row)
                {
                    row--;
                }
            }
        }
    }

    //lose game
    function loseGame()
    {
        alert('ВЫ ПРОИГРАЛИ!');
        setTimeout(startGame(), 3000);
    }

    //win game
    function winGame()
    {
        alert('ВЫ ВЫИГРАЛИ!');
        setTimeout(startGame(), 3000); 
    }

    window.addEventListener('beforeunload', function() 
    {
        if(score != 0)
            saveScore();
    });

    //save score
    function saveScore()
    {
        localStorage.setItem(localStorage.length, score);
    }

    //load score
    function loadScore()
    {
        const showCount = 5;
        let list = document.querySelector('.history-list');
        for(let i = 0; i < localStorage.length; i++)
        {
            if(i < showCount) {
                let key = localStorage.key(i);
                let score = localStorage.getItem(key);
                let p = document.createElement('p');
                p.innerText = parseInt(key) + 1 + ' game: ' + score;
                p.style.fontSize = window.innerWidth / 50 + 'px';
                list.appendChild(p);
            }
        }
    }

    //clear the field or start the game
    function startGame()
    {
        score = 0;
        scoreField.innerText = 0;
        firstArrayFill();
        fillingArray();
        loadScore();
    }

    startGame();
}());