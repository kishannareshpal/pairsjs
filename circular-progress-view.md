---
description: 'An easy to use, and highly customisable progress view, that is circular!'
---

# Circular Progress View

## 🙈 _Gif_shots

![](.gitbook/assets/determinate-border-stroke.gif)

![](.gitbook/assets/indeterminate-stroke-border.gif)

## ​🌶 Want to use it in your project? Here's how to install:

[![API](https://img.shields.io/badge/API-14%2B-brightgreen.svg?style=flat)](https://android-arsenal.com/api?level=14)[ ![Download](https://api.bintray.com/packages/kishannareshpal/maven/circularprogressview/images/download.svg)](https://bintray.com/kishannareshpal/maven/circularprogressview/_latestVersion)

Add the library to the **dependencies { ... }** section of your **app** level `build.gradle` file:

{% code title="build.gradle" %}
```groovy
// Check the badge above to replace the version number :)
implementation 'com.kishannareshpal:circularprogressview:{version.number}'
```
{% endcode %}

## 🐌 Now, let's get started

Add the view to your xml layout file.

{% code title="activity\_main.xml" %}
```markup
<com.kishannareshpal.circularprogressview.CircularProgressView
        xmlns:cpv="http://schemas.android.com/apk/res-auto"
        android:id="@+id/progress"
        android:layout_width="48dp"
        android:layout_height="48dp"
        cpv:progressType="determinate"
        cpv:progressStrokeColor="@color/blue" />
```
{% endcode %}

<table>
  <thead>
    <tr>
      <th style="text-align:left"><b>Attributes</b>
      </th>
      <th style="text-align:left"><b>Description</b>
      </th>
      <th style="text-align:left"><b>Data Type</b>
      </th>
      <th style="text-align:left"><b>Possible Values</b>
      </th>
      <th style="text-align:left"><b>Default Value</b>
      </th>
      <th style="text-align:left"><b>Is Required?</b>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">progressType</td>
      <td style="text-align:left">
        <p><b>Determinate indicators</b> display how long a process will take. They
          should be used when the process completion rate can be detected.</p>
        <p></p>
        <p><b>Indeterminate indicators</b> express an unspecified amount of wait time.
          They should be used when progress isn&#x2019;t detectable, or if it&#x2019;s
          not necessary to indicate how long an activity will take.</p>
      </td>
      <td style="text-align:left">enum</td>
      <td style="text-align:left">
        <ul>
          <li><b>determinate</b>
          </li>
          <li><b>indeterminate</b>
          </li>
        </ul>
      </td>
      <td style="text-align:left"><b>indeterminate</b>
      </td>
      <td style="text-align:left">NO</td>
    </tr>
    <tr>
      <td style="text-align:left">progressStrokeColor</td>
      <td style="text-align:left">the color of the progress stroke indicator</td>
      <td style="text-align:left">color</td>
      <td style="text-align:left">n/a</td>
      <td style="text-align:left">#000000
        <br />(black)</td>
      <td style="text-align:left">NO</td>
    </tr>
    <tr>
      <td style="text-align:left">backgroundColor</td>
      <td style="text-align:left">the color between the stroke indicator</td>
      <td style="text-align:left">color</td>
      <td style="text-align:left">n/a</td>
      <td style="text-align:left">#FF000000
        <br />(transparent)</td>
      <td style="text-align:left">NO</td>
    </tr>
    <tr>
      <td style="text-align:left">borderColor</td>
      <td style="text-align:left">a light color used to highlight the stroke indicator path</td>
      <td style="text-align:left">color</td>
      <td style="text-align:left">n/a</td>
      <td style="text-align:left">#FF000000
        <br />(transparent)</td>
      <td style="text-align:left">NO</td>
    </tr>
    <tr>
      <td style="text-align:left">determinateProgressValue</td>
      <td style="text-align:left">sets the current progress value based on the provided <b>maxDeterminateProgressValue</b>*</td>
      <td
      style="text-align:left">float</td>
        <td style="text-align:left">n/a</td>
        <td style="text-align:left">n/a</td>
        <td style="text-align:left">NO</td>
    </tr>
    <tr>
      <td style="text-align:left">determinateProgressValuePercentage</td>
      <td style="text-align:left">sets the current progress value by percentage based on the provided <b>maxDeterminateProgressValue</b>*</td>
      <td
      style="text-align:left">float</td>
        <td style="text-align:left">n/a</td>
        <td style="text-align:left">n/a</td>
        <td style="text-align:left">NO</td>
    </tr>
    <tr>
      <td style="text-align:left">maxDeterminateProgressValue*</td>
      <td style="text-align:left">the maximum value of the progress indicator. Corresponds to 100%.</td>
      <td
      style="text-align:left">float</td>
        <td style="text-align:left">n/a</td>
        <td style="text-align:left">n/a</td>
        <td style="text-align:left">YES*</td>
    </tr>
    <tr>
      <td style="text-align:left">progressStrokePlacement</td>
      <td style="text-align:left">sets where the stroke indicator should be placed.</td>
      <td style="text-align:left">enum</td>
      <td style="text-align:left">
        <ul>
          <li>outside</li>
          <li>inside</li>
          <li>center</li>
        </ul>
      </td>
      <td style="text-align:left">inside</td>
      <td style="text-align:left">NO</td>
    </tr>
  </tbody>
</table>\* It is required when you set either `determinateProgressValue` or `determinateProgressValuePercentage`.



### 🥢 Methods you can use!!

```java
CircularProgressView cpv = findViewById(R.id.cpv);
```

```java
// returns whether or not the progress type of the progress view is set to ProgressType.INDETERMINATE
(boolean) cpv.isIndeterminate();
```

```java

```

