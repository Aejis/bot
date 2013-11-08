# Hubot

## Most useful scripts

**Planning poker**

```
hubot poker (play|start) - start the round
hubot poker (estimate|bet|rank) <score> - estimate current task with score
hubot poker (finish|end) - finish round and show the bets
```

**Scrumnotes**

```
hubot take scrum notes - Starts taking notes from all users in the room (records all messages starting with yesterday, today, tomorrow, sun, mon, tue, wed, thu, fri, sat, blocking)
hubot stop taking notes - Stops taking scrum notes (if a path is configured saves day notes to a json file)
hubot scrum notes - shows scrum notes taken so far
hubot are you taking notes? - hubot indicates if he's currently taking notes
```

**Remember**

```
hubot remember <key> - Returns a string
hubot remember <key> is <value>. - Returns nothing. Remembers the text for next time!
hubot what do you remember - Returns everything hubot remembers.
hubot forget <key> - Removes key from hubots brain.
```

**Tasks**

```
hubot task add <task> - Add a task
hubot task list tasks - List the tasks
hubot task delete <task number> - Delete a task
```

**Reminder**

```
hubot remind me in <time> to <action> - Set a reminder in <time> to do an <action> <time> is in the format 1 day, 2 hours, 5 minutes etc. Time segments are optional, as are commas
```

**Deadline**

```
hubot deadlines - List what you have due
hubot add deadline 2011-10-30 Thing - Add a deadline for October 10, 2011
hubot remove deadline Thing - Remove a deadline named "Thing"
hubot clear deadlines - Remove all the deadlines
```

**Postgres**

```
hubot pgsql <version> <sql> - Example: hubot pgsql 9.0 select
```

## TODO

- deploy
- semaphoreapp

## Docs

### Testing Hubot Locally

You can test your hubot by running the following.

    % bin/hubot

You'll see some start up output about where your scripts come from and a
prompt.

    [Sun, 04 Dec 2011 18:41:11 GMT] INFO Loading adapter shell
    [Sun, 04 Dec 2011 18:41:11 GMT] INFO Loading scripts from /home/tomb/Development/hubot/scripts
    [Sun, 04 Dec 2011 18:41:11 GMT] INFO Loading scripts from /home/tomb/Development/hubot/src/scripts
    Hubot>

Then you can interact with hubot by typing `hubot help`.

    Hubot> hubot help

    Hubot> animate me <query> - The same thing as `image me`, except adds a few
    convert me <expression> to <units> - Convert expression to given units.
    help - Displays all of the help commands that Hubot knows about.
    ...


### Scripting

Take a look at the scripts in the `./scripts` folder for examples.
Delete any scripts you think are useless or boring.  Add whatever functionality you
want hubot to have. Read up on what you can do with hubot in the [Scripting Guide](https://github.com/github/hubot/blob/master/docs/scripting.md).

### Redis Persistence

If you are going to use the `redis-brain.coffee` script from `hubot-scripts`
(strongly suggested), you will need to add the Redis to Go addon on Heroku which requires a verified
account or you can create an account at [Redis to Go][redistogo] and manually
set the `REDISTOGO_URL` variable.

    % heroku config:add REDISTOGO_URL="..."

If you don't require any persistence feel free to remove the
`redis-brain.coffee` from `hubot-scripts.json` and you don't need to worry
about redis at all.

[redistogo]: https://redistogo.com/

## Adapters

Adapters are the interface to the service you want your hubot to run on. This
can be something like Campfire or IRC. There are a number of third party
adapters that the community have contributed. Check
[Hubot Adapters][hubot-adapters] for the available ones.

If you would like to run a non-Campfire or shell adapter you will need to add
the adapter package as a dependency to the `package.json` file in the
`dependencies` section.

Once you've added the dependency and run `npm install` to install it you can
then run hubot with the adapter.

    % bin/hubot -a <adapter>

Where `<adapter>` is the name of your adapter without the `hubot-` prefix.

[hubot-adapters]: https://github.com/github/hubot/blob/master/docs/adapters.md

## hubot-scripts

There will inevitably be functionality that everyone will want. Instead
of adding it to hubot itself, you can submit pull requests to
[hubot-scripts][hubot-scripts].

To enable scripts from the hubot-scripts package, add the script name with
extension as a double quoted string to the `hubot-scripts.json` file in this
repo.

[hubot-scripts]: https://github.com/github/hubot-scripts

## external-scripts

Tired of waiting for your script to be merged into `hubot-scripts`? Want to
maintain the repository and package yourself? Then this added functionality
maybe for you!

Hubot is now able to load scripts from third-party `npm` packages! To enable
this functionality you can follow the following steps.

1. Add the packages as dependencies into your `package.json`
2. `npm install` to make sure those packages are installed

To enable third-party scripts that you've added you will need to add the package
name as a double quoted string to the `external-scripts.json` file in this repo.